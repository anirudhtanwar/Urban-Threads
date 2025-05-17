import React from "react";
import { Edit, Trash2, ChevronDown, Star, Package, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductFormData } from "./ProductForm";

interface ProductsTableProps {
  products: Array<ProductFormData>;
  onEdit: (product: ProductFormData) => void;
  onDelete: (product: ProductFormData) => void;
  loading?: boolean;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onEdit,
  onDelete,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="p-4">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400">No products found</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" disabled>Delete Selected</Button>
          <Button size="sm" variant="outline" disabled>Export CSV</Button>
          <Button size="sm" variant="outline" disabled>Import CSV</Button>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">Bulk actions coming soon</span>
      </div>
      <table className="w-full border-separate border-spacing-0">
        <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800/50">
          <tr className="bg-gray-50 dark:bg-gray-800/50">
            <th className="py-3 px-4"><input type="checkbox" aria-label="Select all products" /></th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Product</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">SKU</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Brand</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Category</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Stock</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Tags</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
            <th className="py-3 px-4 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((product) => (
            <tr 
              key={product.id} 
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="py-3 px-4"><input type="checkbox" aria-label={`Select product ${product.name}`} /></td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                    <ResponsiveImage src={product.image} alt={product.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {product.description ? product.description.substring(0, 60) + "..." : "No description"}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-sm">{product.sku || '-'}</td>
              <td className="py-3 px-4 text-sm">{product.brand || '-'}</td>
              <td className="py-3 px-4 text-sm capitalize">{product.category}</td>
              <td className="py-3 px-4 text-sm">${product.price.toFixed(2)}</td>
              <td className="py-3 px-4 text-sm">{product.stock ?? '-'}</td>
              <td className="py-3 px-4 text-sm">{product.tags || '-'}</td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1">
                  {product.featured && (
                    <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-500">
                      <Star className="mr-1 h-3 w-3" /> Featured
                    </span>
                  )}
                  {product.newArrival && (
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-500">
                      <Package className="mr-1 h-3 w-3" /> New
                    </span>
                  )}
                  {product.onSale && (
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-900/20 dark:text-red-500">
                      <Percent className="mr-1 h-3 w-3" /> Sale
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="rounded-full h-8 w-8 p-0"
                    >
                      <ChevronDown className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={() => onEdit(product)}
                      className="cursor-pointer flex items-center"
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(product)}
                      className="cursor-pointer flex items-center text-red-500 hover:text-red-500 focus:text-red-500"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
