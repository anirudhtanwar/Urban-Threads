import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";

interface ProductFormProps {
  formData: ProductFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: () => void;
  onCancel: () => void;
  categoryOptions: { value: string; label: string }[];
  submitButtonText: string;
}

export interface ProductFormData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  featured: boolean;
  newArrival: boolean;
  onSale: boolean;
  discount?: number;
  colors?: string[];
  sizes?: string[];
  sku?: string;
  brand?: string;
  material?: string;
  weight?: string;
  stock?: number;
  tags?: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  onCancel,
  categoryOptions,
  submitButtonText,
}) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label htmlFor="name" className="text-sm font-medium mb-1 block">
            Product Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product name"
          />
        </div>
        
        <div className="col-span-2">
          <label htmlFor="description" className="text-sm font-medium mb-1 block">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Product description"
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="price" className="text-sm font-medium mb-1 block">
            Price ($)
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="0.00"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="text-sm font-medium mb-1 block">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        
        <div className="col-span-2">
          <label htmlFor="image" className="text-sm font-medium mb-1 block">
            Image URL
          </label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        {formData.image && (
          <div className="col-span-2 flex justify-center">
            <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <img src={formData.image} alt={formData.name} className="w-full h-full object-cover" />
            </div>
          </div>
        )}
        
        <div className="col-span-2">
          <div className="flex flex-wrap gap-4 mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>Featured</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="newArrival"
                checked={formData.newArrival}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>New Arrival</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="onSale"
                checked={formData.onSale}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>On Sale</span>
            </label>
          </div>
        </div>
        
        {formData.onSale && (
          <div className="col-span-2">
            <label htmlFor="discount" className="text-sm font-medium mb-1 block">
              Discount Percentage (%)
            </label>
            <Input
              id="discount"
              name="discount"
              type="number"
              value={formData.discount || 0}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              max="100"
            />
          </div>
        )}

        <div>
          <label htmlFor="sku" className="text-sm font-medium mb-1 block">SKU</label>
          <Input id="sku" name="sku" value={formData.sku || ''} onChange={handleInputChange} placeholder="Stock Keeping Unit" />
        </div>
        <div>
          <label htmlFor="brand" className="text-sm font-medium mb-1 block">Brand</label>
          <Input id="brand" name="brand" value={formData.brand || ''} onChange={handleInputChange} placeholder="Brand name" />
        </div>
        <div>
          <label htmlFor="material" className="text-sm font-medium mb-1 block">Material</label>
          <Input id="material" name="material" value={formData.material || ''} onChange={handleInputChange} placeholder="e.g. Cotton, Polyester" />
        </div>
        <div>
          <label htmlFor="weight" className="text-sm font-medium mb-1 block">Weight</label>
          <Input id="weight" name="weight" value={formData.weight || ''} onChange={handleInputChange} placeholder="e.g. 200g" />
        </div>
        <div>
          <label htmlFor="stock" className="text-sm font-medium mb-1 block">Stock</label>
          <Input id="stock" name="stock" type="number" value={formData.stock || 0} onChange={handleInputChange} placeholder="0" min="0" />
        </div>
        <div className="col-span-2">
          <label htmlFor="tags" className="text-sm font-medium mb-1 block">Tags</label>
          <Input id="tags" name="tags" value={formData.tags || ''} onChange={handleInputChange} placeholder="Comma separated, e.g. summer,men,casual" />
        </div>
        <div className="col-span-2">
          <label htmlFor="images" className="text-sm font-medium mb-1 block">Additional Images (comma separated URLs)</label>
          <Input id="images" name="images" value={formData.images?.join(',') || ''} onChange={e => handleInputChange({ ...e, target: { ...e.target, name: 'images', value: e.target.value } })} placeholder="https://..." />
        </div>
        <div className="col-span-2">
          <label htmlFor="colors" className="text-sm font-medium mb-1 block">Colors (comma separated)</label>
          <Input id="colors" name="colors" value={formData.colors?.join(',') || ''} onChange={e => handleInputChange({ ...e, target: { ...e.target, name: 'colors', value: e.target.value } })} placeholder="Black,White,Red" />
        </div>
        <div className="col-span-2">
          <label htmlFor="sizes" className="text-sm font-medium mb-1 block">Sizes (comma separated)</label>
          <Input id="sizes" name="sizes" value={formData.sizes?.join(',') || ''} onChange={e => handleInputChange({ ...e, target: { ...e.target, name: 'sizes', value: e.target.value } })} placeholder="S,M,L,XL" />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {submitButtonText}
        </Button>
      </DialogFooter>
    </div>
  );
};
