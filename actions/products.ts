"use server";

import { prisma } from "@/lib/prisma";
import { createSupabaseServer, BUCKET } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

/* ─── Shared types ───────────────────────────────────────────── */

export type ProductDisplay = {
  id: number;
  name: string;
  price: string;
  description: string;
  images: string[];
  author: string;
  instagram: string;
  buyUrl: string | null;
};

export type ProductRow = {
  id: number;
  name: string;
  price: number;
  description: string;
  author: string;
  instagram: string;
  buyUrl: string | null;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: { id: number; url: string; path: string }[];
};

type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string };

/* ─── Read ───────────────────────────────────────────────────── */

export async function getProducts(): Promise<ProductDisplay[]> {
  const products = await prisma.product.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { createdAt: "asc" } } },
  });

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    price: `$${p.price % 1 === 0 ? p.price.toFixed(0) : p.price.toFixed(2)}`,
    description: p.description,
    author: p.author,
    instagram: p.instagram,
    buyUrl: p.buyUrl ?? null,
    images:
      p.images.length > 0
        ? p.images.map((img) => img.url)
        : ["/placeholder.png"],
  }));
}

export async function getAllProducts(): Promise<ProductRow[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { createdAt: "asc" } } },
  });
  return products as ProductRow[];
}

export async function getProductById(id: number): Promise<ProductRow | null> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { createdAt: "asc" } } },
  });
  return product as ProductRow | null;
}

/* ─── Create ─────────────────────────────────────────────────── */

export async function createProduct(data: {
  name: string;
  price: number;
  description: string;
  author: string;
  instagram: string;
  available: boolean;
}): Promise<ActionResult<ProductRow>> {
  if (!data.name.trim()) return { ok: false, error: "El nombre es requerido." };
  if (!data.description.trim()) return { ok: false, error: "La descripción es requerida." };
  if (!data.author.trim()) return { ok: false, error: "El autor es requerido." };
  if (data.price <= 0) return { ok: false, error: "El precio debe ser mayor a 0." };

  const product = await prisma.product.create({
    data: {
      name: data.name.trim(),
      price: data.price,
      description: data.description.trim(),
      author: data.author.trim(),
      instagram: data.instagram.trim().replace(/^@/, ""),
      available: data.available,
    },
    include: { images: true },
  });

  revalidatePath("/galery");
  revalidatePath("/admin");
  return { ok: true, data: product as ProductRow };
}

export async function createProductWithImages(
  formData: FormData
): Promise<ActionResult<ProductRow>> {
  const name = ((formData.get("name") as string) ?? "").trim();
  const price = parseFloat((formData.get("price") as string) ?? "");
  const description = ((formData.get("description") as string) ?? "").trim();
  const author = ((formData.get("author") as string) ?? "").trim();
  const instagram = ((formData.get("instagram") as string) ?? "").trim().replace(/^@/, "");
  const buyUrl = ((formData.get("buyUrl") as string) ?? "").trim() || null;
  const available = formData.get("available") === "true";
  const files = formData.getAll("images").filter(
    (f): f is File => f instanceof File && f.size > 0
  );

  if (!name) return { ok: false, error: "El nombre es requerido." };
  if (!description) return { ok: false, error: "La descripción es requerida." };
  if (!author) return { ok: false, error: "El autor es requerido." };
  if (isNaN(price) || price <= 0) return { ok: false, error: "El precio debe ser mayor a 0." };

  const product = await prisma.product.create({
    data: { name, price, description, author, instagram, buyUrl, available },
    include: { images: true },
  });

  if (files.length > 0) {
    const supabase = createSupabaseServer();
    const uploaded: { url: string; path: string }[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `products/${product.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, buffer, { contentType: file.type });
      if (error) continue;
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
      uploaded.push({ url: urlData.publicUrl, path });
    }

    if (uploaded.length > 0) {
      await prisma.productImage.createMany({
        data: uploaded.map(({ url, path }) => ({ productId: product.id, url, path })),
      });
    }
  }

  const final = await prisma.product.findUnique({
    where: { id: product.id },
    include: { images: { orderBy: { createdAt: "asc" } } },
  });

  revalidatePath("/galery");
  revalidatePath("/admin");
  return { ok: true, data: final as ProductRow };
}

/* ─── Update ─────────────────────────────────────────────────── */

export async function updateProduct(
  id: number,
  data: {
    name: string;
    price: number;
    description: string;
    author: string;
    instagram: string;
    available: boolean;
  }
): Promise<ActionResult<ProductRow>> {
  if (!data.name.trim()) return { ok: false, error: "El nombre es requerido." };
  if (!data.description.trim()) return { ok: false, error: "La descripción es requerida." };
  if (!data.author.trim()) return { ok: false, error: "El autor es requerido." };
  if (data.price <= 0) return { ok: false, error: "El precio debe ser mayor a 0." };

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: data.name.trim(),
      price: data.price,
      description: data.description.trim(),
      author: data.author.trim(),
      instagram: data.instagram.trim().replace(/^@/, ""),
      available: data.available,
    },
    include: { images: true },
  });

  revalidatePath("/galery");
  revalidatePath("/admin");
  return { ok: true, data: product as ProductRow };
}

export async function updateProductWithImages(
  id: number,
  formData: FormData
): Promise<ActionResult<ProductRow>> {
  const name = ((formData.get("name") as string) ?? "").trim();
  const price = parseFloat((formData.get("price") as string) ?? "");
  const description = ((formData.get("description") as string) ?? "").trim();
  const author = ((formData.get("author") as string) ?? "").trim();
  const instagram = ((formData.get("instagram") as string) ?? "").trim().replace(/^@/, "");
  const buyUrl = ((formData.get("buyUrl") as string) ?? "").trim() || null;
  const available = formData.get("available") === "true";
  const files = formData.getAll("images").filter(
    (f): f is File => f instanceof File && f.size > 0
  );

  if (!name) return { ok: false, error: "El nombre es requerido." };
  if (!description) return { ok: false, error: "La descripción es requerida." };
  if (!author) return { ok: false, error: "El autor es requerido." };
  if (isNaN(price) || price <= 0) return { ok: false, error: "El precio debe ser mayor a 0." };

  await prisma.product.update({
    where: { id },
    data: { name, price, description, author, instagram, buyUrl, available },
  });

  if (files.length > 0) {
    const supabase = createSupabaseServer();
    const uploaded: { url: string; path: string }[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `products/${id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, buffer, { contentType: file.type });
      if (error) continue;
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
      uploaded.push({ url: urlData.publicUrl, path });
    }

    if (uploaded.length > 0) {
      await prisma.productImage.createMany({
        data: uploaded.map(({ url, path }) => ({ productId: id, url, path })),
      });
    }
  }

  const final = await prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { createdAt: "asc" } } },
  });

  revalidatePath("/galery");
  revalidatePath("/admin");
  return { ok: true, data: final as ProductRow };
}

/* ─── Delete ─────────────────────────────────────────────────── */

export async function deleteProduct(id: number): Promise<ActionResult> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!product) return { ok: false, error: "Producto no encontrado." };

  if (product.images.length > 0) {
    const supabase = createSupabaseServer();
    const paths = product.images.map((img) => img.path);
    await supabase.storage.from(BUCKET).remove(paths);
  }

  await prisma.product.delete({ where: { id } });

  revalidatePath("/galery");
  revalidatePath("/admin");
  return { ok: true, data: undefined };
}

/* ─── Toggle available ───────────────────────────────────────── */

export async function toggleProductAvailable(
  id: number,
  available: boolean
): Promise<ActionResult> {
  await prisma.product.update({ where: { id }, data: { available } });
  revalidatePath("/galery");
  revalidatePath("/admin");
  return { ok: true, data: undefined };
}

/* ─── Upload images ──────────────────────────────────────────── */

export async function uploadProductImages(
  formData: FormData
): Promise<ActionResult<{ url: string; path: string }[]>> {
  const productId = Number(formData.get("productId"));
  const files = formData.getAll("images") as File[];

  if (!productId || isNaN(productId)) {
    return { ok: false, error: "ID de producto inválido." };
  }
  if (files.length === 0) {
    return { ok: false, error: "No se enviaron imágenes." };
  }

  const supabase = createSupabaseServer();
  const uploaded: { url: string; path: string }[] = [];

  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;

    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `products/${productId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, buffer, { contentType: file.type, upsert: false });

    if (error) return { ok: false, error: `Error subiendo imagen: ${error.message}` };

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
    uploaded.push({ url: urlData.publicUrl, path });
  }

  if (uploaded.length === 0) {
    return { ok: false, error: "No se subió ninguna imagen válida." };
  }

  await prisma.productImage.createMany({
    data: uploaded.map(({ url, path }) => ({ productId, url, path })),
  });

  revalidatePath("/galery");
  revalidatePath("/admin");
  return { ok: true, data: uploaded };
}

/* ─── Delete image ───────────────────────────────────────────── */

export async function deleteProductImage(imageId: number): Promise<ActionResult> {
  const image = await prisma.productImage.findUnique({ where: { id: imageId } });
  if (!image) return { ok: false, error: "Imagen no encontrada." };

  const supabase = createSupabaseServer();
  const { error } = await supabase.storage.from(BUCKET).remove([image.path]);
  if (error) return { ok: false, error: `Error eliminando del storage: ${error.message}` };

  await prisma.productImage.delete({ where: { id: imageId } });

  revalidatePath("/galery");
  revalidatePath("/admin");
  return { ok: true, data: undefined };
}
