import React from "react";
import { ShoppingBag, Star, Package, Percent } from "lucide-react";
import { Product } from "@/context/shop-context";

interface DashboardStatsProps {
  products: Product[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ products }) => {
  // Count product tags
  const stats = {
    total: products.length,
    featured: products.filter(p => p.featured).length,
    newArrivals: products.filter(p => p.newArrival).length,
    onSale: products.filter(p => p.onSale).length,
    totalStock: products.reduce((sum, p) => sum + (p.stock || 0), 0),
    brands: Array.from(new Set(products.map(p => p.brand).filter(Boolean))).length,
    categories: Array.from(new Set(products.map(p => p.category).filter(Boolean))).length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
            <h3 className="text-2xl font-semibold">{stats.total}</h3>
          </div>
          <ShoppingBag className="text-blue-500 h-10 w-10 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full" />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Featured</p>
            <h3 className="text-2xl font-semibold">{stats.featured}</h3>
          </div>
          <Star className="text-yellow-500 h-10 w-10 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-full" />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">New Arrivals</p>
            <h3 className="text-2xl font-semibold">{stats.newArrivals}</h3>
          </div>
          <Package className="text-green-500 h-10 w-10 p-2 bg-green-50 dark:bg-green-900/20 rounded-full" />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">On Sale</p>
            <h3 className="text-2xl font-semibold">{stats.onSale}</h3>
          </div>
          <Percent className="text-red-500 h-10 w-10 p-2 bg-red-50 dark:bg-red-900/20 rounded-full" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Stock</p>
            <h3 className="text-2xl font-semibold">{stats.totalStock}</h3>
          </div>
          <Package className="text-purple-500 h-10 w-10 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-full" />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Brands</p>
            <h3 className="text-2xl font-semibold">{stats.brands}</h3>
          </div>
          <Star className="text-pink-500 h-10 w-10 p-2 bg-pink-50 dark:bg-pink-900/20 rounded-full" />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
            <h3 className="text-2xl font-semibold">{stats.categories}</h3>
          </div>
          <Package className="text-orange-500 h-10 w-10 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};
