"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  createProductWithImages,
  updateProductWithImages,
  deleteProduct,
  toggleProductAvailable,
  deleteProductImage,
  type ProductRow,
} from "@/actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus, Upload, X, ImageOff } from "lucide-react";
import { toast } from "sonner";

/* ─── Types ─────────────────────────────────────────────────── */
type DialogMode = "create" | "edit";
type FormErrors = Partial<Record<"name" | "price" | "description", string>>;

const EMPTY_FORM = {
  name: "",
  price: "",
  description: "",
  author: "",
  instagram: "",
  buyUrl: "",
  available: true,
};

/* ─── AdminClient ────────────────────────────────────────────── */
export function AdminClient({ initialProducts }: { initialProducts: ProductRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<DialogMode>("create");
  const [editingProduct, setEditingProduct] = useState<ProductRow | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  /* image queue (new files to upload) */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  /* helpers */
  const refresh = () => router.refresh();

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "El nombre es requerido.";
    const price = parseFloat(form.price);
    if (!form.price.trim() || isNaN(price) || price <= 0)
      errs.price = "Ingresa un precio válido mayor a 0.";
    if (!form.description.trim()) errs.description = "La descripción es requerida.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function openCreate() {
    setMode("create");
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setSelectedFiles([]);
    setPreviews([]);
    setDialogOpen(true);
  }

  function openEdit(product: ProductRow) {
    setMode("edit");
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: String(product.price),
      description: product.description,
      author: product.author,
      instagram: product.instagram,
      buyUrl: product.buyUrl ?? "",
      available: product.available,
    });
    setErrors({});
    setSelectedFiles([]);
    setPreviews([]);
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setEditingProduct(null);
    setErrors({});
    previews.forEach((p) => URL.revokeObjectURL(p));
    setSelectedFiles([]);
    setPreviews([]);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).filter((f) =>
      f.type.startsWith("image/")
    );
    setSelectedFiles((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeQueued(idx: number) {
    URL.revokeObjectURL(previews[idx]);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  }

  /* ── Save (create or update) ── */
  async function handleSave() {
    if (!validate()) return;

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("description", form.description);
    fd.append("author", form.author);
    fd.append("instagram", form.instagram);
    fd.append("buyUrl", form.buyUrl);
    fd.append("available", String(form.available));
    selectedFiles.forEach((f) => fd.append("images", f));

    startTransition(async () => {
      if (mode === "create") {
        const res = await createProductWithImages(fd);
        if (!res.ok) { toast.error(res.error); return; }
        toast.success("Producto creado.");
        closeDialog();
        refresh();
      } else if (editingProduct) {
        const res = await updateProductWithImages(editingProduct.id, fd);
        if (!res.ok) { toast.error(res.error); return; }
        toast.success("Producto actualizado.");
        closeDialog();
        refresh();
      }
    });
  }

  /* ── Delete product ── */
  function handleDelete(id: number, name: string) {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
    startTransition(async () => {
      const res = await deleteProduct(id);
      if (!res.ok) { toast.error(res.error); return; }
      toast.success("Producto eliminado.");
      refresh();
    });
  }

  /* ── Toggle available ── */
  function handleToggle(id: number, current: boolean) {
    startTransition(async () => {
      const res = await toggleProductAvailable(id, !current);
      if (!res.ok) { toast.error(res.error); return; }
      refresh();
    });
  }

  /* ── Delete existing image ── */
  function handleDeleteImage(imageId: number) {
    startTransition(async () => {
      const res = await deleteProductImage(imageId);
      if (!res.ok) { toast.error(res.error); return; }
      toast.success("Imagen eliminada.");
      /* update local state so UI reflects change instantly */
      setEditingProduct((prev) =>
        prev ? { ...prev, images: prev.images.filter((img) => img.id !== imageId) } : prev
      );
      refresh();
    });
  }

  const existingImages = editingProduct?.images ?? [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Productos</h1>
          <p className="text-sm text-gray-500 mt-0.5">{initialProducts.length} productos en total</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus size={16} />
          Nuevo producto
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Nombre</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Imágenes</TableHead>
              <TableHead>Disponible</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-400">
                  Sin productos aún. Crea el primero.
                </TableCell>
              </TableRow>
            )}
            {initialProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-gray-500">
                  {product.author}
                  <span className="ml-1 text-pink-500 text-xs">@{product.instagram}</span>
                </TableCell>
                <TableCell>
                  ${product.price % 1 === 0 ? product.price.toFixed(0) : product.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{product.images.length} img</Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={product.available}
                    onCheckedChange={() => handleToggle(product.id, product.available)}
                    disabled={isPending}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEdit(product)}
                      disabled={isPending}
                    >
                      <Pencil size={15} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(product.id, product.name)}
                      disabled={isPending}
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeDialog(); }}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Nuevo producto" : `Editar · ${editingProduct?.name}`}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => {
                  setForm((f) => ({ ...f, name: e.target.value }));
                  if (errors.name) setErrors((er) => ({ ...er, name: undefined }));
                }}
                placeholder="Sérum Lumière"
                className={errors.name ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Price + Author */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="price">Precio *</Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  step={0.01}
                  value={form.price}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, price: e.target.value }));
                    if (errors.price) setErrors((er) => ({ ...er, price: undefined }));
                  }}
                  placeholder="148"
                  className={errors.price ? "border-red-400 focus-visible:ring-red-400" : ""}
                />
                {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="author">Autor</Label>
                <Input
                  id="author"
                  value={form.author}
                  onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                  placeholder="Marie Dupont"
                />
              </div>
            </div>

            {/* Instagram */}
            <div className="space-y-1">
              <Label htmlFor="instagram">Instagram (sin @)</Label>
              <Input
                id="instagram"
                value={form.instagram}
                onChange={(e) => setForm((f) => ({ ...f, instagram: e.target.value }))}
                placeholder="mariedupont"
              />
            </div>

            {/* Buy URL */}
            <div className="space-y-1">
              <Label htmlFor="buyUrl">URL de compra</Label>
              <Input
                id="buyUrl"
                type="url"
                value={form.buyUrl}
                onChange={(e) => setForm((f) => ({ ...f, buyUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                rows={3}
                value={form.description}
                onChange={(e) => {
                  setForm((f) => ({ ...f, description: e.target.value }));
                  if (errors.description) setErrors((er) => ({ ...er, description: undefined }));
                }}
                placeholder="Describe el producto..."
                className={errors.description ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Available */}
            <div className="flex items-center gap-3">
              <Switch
                id="available"
                checked={form.available}
                onCheckedChange={(v) => setForm((f) => ({ ...f, available: v }))}
              />
              <Label htmlFor="available">Disponible en galería</Label>
            </div>

            {/* ── Images section ── */}
            <div className="space-y-3 border-t pt-4">
              <p className="text-sm font-medium text-gray-700">Imágenes</p>

              {/* Existing images (edit mode) */}
              {mode === "edit" && existingImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {existingImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative group rounded-lg overflow-hidden border aspect-square bg-gray-50"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt="producto"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleDeleteImage(img.id)}
                        disabled={isPending}
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Eliminar imagen"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {mode === "edit" && existingImages.length === 0 && previews.length === 0 && (
                <div className="flex flex-col items-center justify-center py-5 border-2 border-dashed rounded-xl text-gray-400 gap-1">
                  <ImageOff size={24} />
                  <p className="text-xs">Sin imágenes aún</p>
                </div>
              )}

              {/* Queued new images (preview) */}
              {previews.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {previews.map((src, i) => (
                    <div
                      key={i}
                      className="relative group rounded-lg overflow-hidden border-2 border-dashed border-blue-300 aspect-square bg-blue-50"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeQueued(i)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Quitar"
                      >
                        <X size={11} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 text-center text-[10px] bg-blue-500/80 text-white py-0.5">
                        nueva
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* File picker */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={14} />
                {previews.length > 0
                  ? `${previews.length} imagen(es) seleccionada(s) · Agregar más`
                  : "Seleccionar imágenes"}
              </Button>
            </div>

            {/* Submit */}
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="w-full"
            >
              {isPending
                ? "Guardando..."
                : mode === "create"
                ? "Crear producto"
                : "Guardar cambios"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
