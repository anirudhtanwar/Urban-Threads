import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/shop-context";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { VoiceSearchButton } from "@/components/voice-search-button";

// Admin components
import { ProductsTable } from "@/components/admin/ProductsTable";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { ProductSearch } from "@/components/admin/ProductSearch";
import { ProductDialogs } from "@/components/admin/ProductDialogs";
import { ProductFormData } from "@/components/admin/ProductForm";

// Utility function to convert between Product and ProductFormData
const productToFormData = (product: any): ProductFormData => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    category: product.category || 'tshirts',
    featured: product.featured || false,
    newArrival: product.newArrival || false,
    onSale: product.onSale || false,
    discount: product.discount || 0,
    colors: product.colors,
    sizes: product.sizes,
    images: product.images
  };
};

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, removeProduct } = useShop();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductFormData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductFormData[]>([]);
  const [loading, setLoading] = useState(true);

  // For product form
  const [formData, setFormData] = useState<ProductFormData>({
    id: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'tshirts',
    featured: false,
    newArrival: false,
    onSale: false,
    discount: 0,
  });

  // Authentication check
  useEffect(() => {
    if (user?.email !== 'admin@urbanthreads.com') {
      navigate('/');
      toast.error("Access denied. Admin privileges required.");
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [user, navigate]);

  // Convert products to ProductFormData and filter
  useEffect(() => {
    const formattedProducts = products.map(productToFormData);
    
    if (searchTerm) {
      const filtered = formattedProducts.filter(
        product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(formattedProducts);
    }
  }, [searchTerm, products]);

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      price: 0,
      image: '',
      category: 'tshirts',
      featured: false,
      newArrival: false,
      onSale: false,
      discount: 0,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price' || name === 'discount') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddProduct = () => {
    try {
      // Generate a unique ID
      const newProduct = {
        ...formData,
        id: Math.random().toString(36).substring(2, 15),
        colors: ['Default'],
        sizes: ['One Size'],
        images: [formData.image]
      };
      
      addProduct(newProduct);
      setIsAddDialogOpen(false);
      resetForm();
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Failed to add product.");
      console.error(error);
    }
  };

  const handleEditProduct = () => {
    try {
      if (currentProduct) {
        const updatedProduct = {
          ...formData,
          colors: currentProduct.colors || ['Default'],
          sizes: currentProduct.sizes || ['One Size'],
          images: currentProduct.images || [formData.image]
        };
        
        updateProduct(updatedProduct);
        setIsEditDialogOpen(false);
        resetForm();
        setCurrentProduct(null);
        toast.success("Product updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update product.");
      console.error(error);
    }
  };

  const handleDeleteProduct = () => {
    try {
      if (currentProduct) {
        removeProduct(currentProduct.id);
        setIsDeleteDialogOpen(false);
        setCurrentProduct(null);
        toast.success("Product deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete product.");
      console.error(error);
    }
  };

  const openEditDialog = (product: ProductFormData) => {
    setCurrentProduct(product);
    setFormData(product);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (product: ProductFormData) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const categoryOptions = [
    { value: 'tshirts', label: 'T-Shirts' },
    { value: 'hoodies', label: 'Hoodies' },
    { value: 'jackets', label: 'Jackets' },
    { value: 'pants', label: 'Pants' },
    { value: 'shorts', label: 'Shorts' },
    { value: 'accessories', label: 'Accessories' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your products inventory
          </p>
        </div>
        <Button 
          onClick={() => {
            resetForm();
            setIsAddDialogOpen(true);
          }}
          className="flex items-center gap-2 rounded-full hover:scale-105 transition-transform duration-200"
        >
          <Plus size={16} />
          Add New Product
        </Button>
      </div>

      <DashboardStats products={products} />

      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <TabsList className="mb-4 sm:mb-0">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="sale">On Sale</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <VoiceSearchButton onSearchResult={setSearchTerm} />
            </div>
          </div>

          <TabsContent value="all" className="p-0">
            <ProductsTable 
              products={filteredProducts} 
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
              loading={loading}
            />
          </TabsContent>
          
          <TabsContent value="featured" className="p-0">
            <ProductsTable 
              products={filteredProducts.filter(p => p.featured)} 
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
              loading={loading}
            />
          </TabsContent>
          
          <TabsContent value="new" className="p-0">
            <ProductsTable 
              products={filteredProducts.filter(p => p.newArrival)} 
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
              loading={loading}
            />
          </TabsContent>
          
          <TabsContent value="sale" className="p-0">
            <ProductsTable 
              products={filteredProducts.filter(p => p.onSale)} 
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
              loading={loading}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Dialogs */}
      <ProductDialogs
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        currentProduct={currentProduct}
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddProduct={handleAddProduct}
        handleEditProduct={handleEditProduct}
        handleDeleteProduct={handleDeleteProduct}
        categoryOptions={categoryOptions}
      />
    </div>
  );
};

export default AdminPage;
