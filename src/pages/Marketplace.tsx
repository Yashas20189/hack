import { useState, useEffect } from "react";
import { Search, Filter, Grid, List, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  seller: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  liked: boolean;
  location: string;
}

export default function Marketplace() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [products, setProducts] = useState<Product[]>([]);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        title: 'Vintage Leather Jacket',
        price: 85,
        category: 'fashion',
        condition: 'Good',
        seller: 'SarahStyles',
        rating: 4.8,
        reviews: 24,
        imageUrl: '/api/placeholder/300/300',
        liked: false,
        location: 'New York, NY'
      },
      {
        id: '2',
        title: 'MacBook Pro 2019',
        price: 1200,
        category: 'electronics',
        condition: 'Excellent',
        seller: 'TechDealer',
        rating: 4.9,
        reviews: 56,
        imageUrl: '/api/placeholder/300/300',
        liked: true,
        location: 'San Francisco, CA'
      },
      {
        id: '3',
        title: 'Antique Wooden Coffee Table',
        price: 150,
        category: 'furniture',
        condition: 'Good',
        seller: 'VintageFinds',
        rating: 4.6,
        reviews: 12,
        imageUrl: '/api/placeholder/300/300',
        liked: false,
        location: 'Austin, TX'
      },
      {
        id: '4',
        title: 'Canon DSLR Camera',
        price: 450,
        category: 'electronics',
        condition: 'Very Good',
        seller: 'PhotoPro',
        rating: 5.0,
        reviews: 8,
        imageUrl: '/api/placeholder/300/300',
        liked: false,
        location: 'Los Angeles, CA'
      },
      {
        id: '5',
        title: 'Designer Handbag',
        price: 200,
        category: 'fashion',
        condition: 'Excellent',
        seller: 'LuxuryResale',
        rating: 4.7,
        reviews: 33,
        imageUrl: '/api/placeholder/300/300',
        liked: true,
        location: 'Miami, FL'
      },
      {
        id: '6',
        title: 'Hardcover Book Collection',
        price: 30,
        category: 'books',
        condition: 'Good',
        seller: 'BookLover123',
        rating: 4.5,
        reviews: 15,
        imageUrl: '/api/placeholder/300/300',
        liked: false,
        location: 'Chicago, IL'
      }
    ];
    setProducts(mockProducts);
  }, []);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'books', label: 'Books' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'sports', label: 'Sports' },
    { value: 'toys', label: 'Toys' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, liked: !product.liked }
        : product
    ));
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-eco-warm/50">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-2 right-2 p-2 rounded-full ${
            product.liked ? 'text-red-500' : 'text-white hover:text-red-500'
          } bg-white/80 hover:bg-white/90`}
          onClick={() => toggleLike(product.id)}
        >
          <Heart className={`w-4 h-4 ${product.liked ? 'fill-current' : ''}`} />
        </Button>
        <Badge className="absolute top-2 left-2 bg-eco-success text-white">
          {product.condition}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Link to={`/product/${product.id}`} className="flex-1">
            <h3 className="font-semibold text-eco-primary hover:text-eco-primary-light transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
        </div>
        
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-2">{product.location}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-eco-primary">${product.price}</span>
          <span className="text-sm text-muted-foreground">by {product.seller}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-eco-primary mb-2">Marketplace</h1>
        <p className="text-muted-foreground">Discover amazing second-hand finds from our community</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card p-6 rounded-lg border border-eco-warm/50 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* View Mode */}
          <div className="flex border border-border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          {filteredProducts.length} products found
        </p>
        <Button variant="outline" className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Products Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg" className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white">
          Load More Products
        </Button>
      </div>
    </div>
  );
}