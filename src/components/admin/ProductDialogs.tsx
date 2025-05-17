
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { ProductForm, ProductFormData } from "./ProductForm";

interface ProductDialogsProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  currentProduct: ProductFormData | null;
  formData: ProductFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleAddProduct: () => void;
  handleEditProduct: () => void;
  handleDeleteProduct: () => void;
  categoryOptions: { value: string; label: string }[];
}

export const ProductDialogs: React.FC<ProductDialogsProps> = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  isEditDialogOpen,
  setIsEditDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  currentProduct,
  formData,
  handleInputChange,
  handleAddProduct,
  handleEditProduct,
  handleDeleteProduct,
  categoryOptions,
}) => {
  return (
    <>
      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill the form below to add a new product to your inventory.
            </DialogDescription>
          </DialogHeader>
          <ProductForm 
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleAddProduct}
            onCancel={() => setIsAddDialogOpen(false)}
            categoryOptions={categoryOptions}
            submitButtonText="Add Product"
          />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product details below.
            </DialogDescription>
          </DialogHeader>
          <ProductForm 
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleEditProduct}
            onCancel={() => setIsEditDialogOpen(false)}
            categoryOptions={categoryOptions}
            submitButtonText="Save Changes"
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentProduct && (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded overflow-hidden">
                  <ResponsiveImage src={currentProduct.image} alt={currentProduct.name} />
                </div>
                <div>
                  <h4 className="font-medium">{currentProduct.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${currentProduct.price.toFixed(2)} - {currentProduct.category}
                  </p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
