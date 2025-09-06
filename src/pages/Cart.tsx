import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  title: string;
  price: number;
  seller: string;
  condition: string;
  imageUrl: string;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      title: 'Vintage Leather Jacket',
      price: 85,
      seller: 'SarahStyles',
      condition: 'Good',
      imageUrl: '/api/placeholder/100/100',
      quantity: 1
    },
    {
      id: '2',
      title: 'Designer Handbag',
      price: 200,
      seller: 'LuxuryResale',
      condition: 'Excellent',
      imageUrl: '/api/placeholder/100/100',
      quantity: 1
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const { toast } = useToast();

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'eco10') {
      toast({
        title: "Promo code applied!",
        description: "You saved 10% with ECO10!",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const discount = promoCode.toLowerCase() === 'eco10' ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleCheckout = () => {
    toast({
      title: "Checkout successful!",
      description: "Your order has been placed. You'll receive a confirmation email shortly.",
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-eco-primary/10 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-eco-primary" />
          </div>
          <h1 className="text-2xl font-bold text-eco-primary mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet. 
            Start exploring our sustainable marketplace!
          </p>
          <Link to="/marketplace">
            <Button className="bg-eco-primary hover:bg-eco-primary-light">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-eco-primary mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">Review your items before checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card className="border-eco-warm/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-eco-primary">
                <ShoppingBag className="w-5 h-5" />
                Cart Items ({cartItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center space-x-4">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition-opacity"
                      />
                    </Link>
                    
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-semibold hover:text-eco-primary transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">by {item.seller}</p>
                      <Badge variant="secondary" className="mt-1">
                        {item.condition}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-eco-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {index < cartItems.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sustainability Impact */}
          <Card className="mt-6 border-eco-success/50 bg-eco-success/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-eco-success/20 rounded-full">
                  <Leaf className="w-5 h-5 text-eco-success" />
                </div>
                <div>
                  <h4 className="font-semibold text-eco-primary">Environmental Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    By choosing second-hand, you're helping save approximately 2.5 kg of CO₂ 
                    and 150 liters of water compared to buying new items!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="border-eco-warm/50 sticky top-8">
            <CardHeader>
              <CardTitle className="text-eco-primary">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-eco-success" : ""}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Free shipping on orders over $50
                </p>
              )}
              
              {discount > 0 && (
                <div className="flex justify-between text-eco-success">
                  <span>Discount (ECO10)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-eco-primary">${total.toFixed(2)}</span>
              </div>
              
              {/* Promo Code */}
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={applyPromoCode}>
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Try code "ECO10" for 10% off!
                </p>
              </div>
              
              <Button 
                className="w-full bg-eco-primary hover:bg-eco-primary-light"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Link to="/marketplace">
                <Button variant="outline" className="w-full border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}