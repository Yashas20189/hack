import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Star, 
  Shield, 
  Truck, 
  MessageCircle,
  Share2,
  ArrowLeft,
  ShoppingCart,
  User,
  Calendar,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Mock product data - in a real app, this would be fetched based on the ID
  const product = {
    id: id || '1',
    title: 'Vintage Leather Jacket',
    price: 85,
    originalPrice: 250,
    condition: 'Good',
    category: 'Fashion',
    description: `This beautiful vintage leather jacket is in excellent condition with minimal signs of wear. 
    Perfect for adding a classic touch to your wardrobe while making a sustainable choice. 
    The jacket features genuine leather construction, original hardware, and a timeless design 
    that never goes out of style. Size Medium fits true to size.`,
    images: [
      '/api/placeholder/500/500',
      '/api/placeholder/500/500',
      '/api/placeholder/500/500'
    ],
    seller: {
      name: 'SarahStyles',
      rating: 4.8,
      reviews: 24,
      joinDate: 'March 2023',
      responseTime: '< 1 hour',
      avatar: 'SS'
    },
    specs: {
      Brand: 'Vintage Collection',
      Size: 'Medium',
      Color: 'Brown',
      Material: 'Genuine Leather',
      Condition: 'Good - Minor wear'
    },
    location: 'New York, NY',
    views: 142,
    likes: 23,
    postedDate: '3 days ago'
  };

  const addToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const contactSeller = () => {
    toast({
      title: "Message sent!",
      description: "Your message has been sent to the seller. They'll respond soon!",
    });
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from wishlist" : "Added to wishlist",
      description: isLiked ? "Item removed from your wishlist." : "Item saved to your wishlist.",
    });
  };

  const savings = product.originalPrice - product.price;
  const savingsPercent = Math.round((savings / product.originalPrice) * 100);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/marketplace" className="inline-flex items-center text-eco-primary hover:text-eco-primary-light mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images[selectedImageIndex]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                  selectedImageIndex === index 
                    ? 'border-eco-primary' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title and Price */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold text-eco-primary">{product.title}</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLike}
                className={isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-eco-primary">${product.price}</span>
              <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
              <Badge className="bg-eco-success text-white">
                Save ${savings} ({savingsPercent}% off)
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {product.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Posted {product.postedDate}
              </span>
              <span>{product.views} views</span>
              <span>{product.likes} likes</span>
            </div>
          </div>

          {/* Condition and Category */}
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-eco-accent/20 text-eco-primary">
              {product.category}
            </Badge>
            <Badge variant="outline" className="border-eco-primary text-eco-primary">
              Condition: {product.condition}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-eco-primary hover:bg-eco-primary-light"
              onClick={addToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white"
              onClick={contactSeller}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Message Seller
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex gap-4 p-4 bg-eco-warm/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-eco-success" />
              <span className="text-sm font-medium">Buyer Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-eco-success" />
              <span className="text-sm font-medium">Fast Shipping</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-eco-primary mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-lg font-semibold text-eco-primary mb-3">Product Details</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-eco-warm/30">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seller Info */}
          <Card className="border-eco-warm/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-eco-primary mb-4">Seller Information</h3>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-eco-primary text-white">
                    {product.seller.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">{product.seller.name}</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{product.seller.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({product.seller.reviews} reviews)</span>
                  </div>
                </div>
                <Link to={`/seller/${product.seller.name}`}>
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Member since:</span>
                  <p className="font-medium">{product.seller.joinDate}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Response time:</span>
                  <p className="font-medium">{product.seller.responseTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}