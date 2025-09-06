import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Recycle, 
  Heart, 
  Users, 
  ShoppingBag, 
  TrendingUp,
  Star,
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";

export default function Landing() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-eco-success" />,
      title: "Eco-Friendly Shopping",
      description: "Extend product lifecycles and reduce waste by shopping second-hand items.",
    },
    {
      icon: <Recycle className="w-8 h-8 text-eco-success" />,
      title: "Circular Economy",
      description: "Be part of the solution by participating in sustainable consumption patterns.",
    },
    {
      icon: <Heart className="w-8 h-8 text-eco-success" />,
      title: "Community Driven",
      description: "Connect with like-minded individuals in our trusted marketplace community.",
    },
    {
      icon: <Users className="w-8 h-8 text-eco-success" />,
      title: "Trusted Sellers",
      description: "Verified profiles and ratings ensure safe and reliable transactions.",
    },
  ];

  const categories = [
    { name: "Fashion", count: "2,500+", icon: "👕" },
    { name: "Electronics", count: "1,200+", icon: "📱" },
    { name: "Books", count: "800+", icon: "📚" },
    { name: "Home & Garden", count: "950+", icon: "🏠" },
    { name: "Sports", count: "600+", icon: "⚽" },
    { name: "Toys", count: "400+", icon: "🧸" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      avatar: "SC",
      rating: 5,
      text: "I've found amazing vintage pieces and saved so much money. Plus, it feels great to shop sustainably!",
    },
    {
      name: "Miguel Rodriguez",
      avatar: "MR",
      rating: 5,
      text: "Selling my old electronics was so easy. The community is wonderful and transactions are smooth.",
    },
    {
      name: "Emma Thompson",
      avatar: "ET",
      rating: 5,
      text: "EcoFinds has changed how I shop. Quality second-hand items at great prices!",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-eco-primary/90 to-eco-primary/70" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <Badge variant="secondary" className="mb-6 bg-white/10 text-white hover:bg-white/20">
            🌱 Sustainable Shopping Starts Here
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Discover Amazing
            <span className="block text-eco-accent">Second-Hand Finds</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of conscious consumers buying and selling pre-loved items. 
            Make sustainable choices while finding unique treasures at great prices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace">
              <Button size="lg" className="bg-white text-eco-primary hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
            <Link to="/sell">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
                <TrendingUp className="w-5 h-5 mr-2" />
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-eco-warm/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-eco-primary">
              Why Choose EcoFinds?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              More than just a marketplace - we're building a sustainable future together
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 border-eco-warm/50">
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-eco-primary">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-eco-primary">
              Popular Categories
            </h2>
            <p className="text-lg text-muted-foreground">
              Find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link to={`/marketplace?category=${category.name.toLowerCase()}`} key={index}>
                <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-eco-primary/50">
                  <CardContent className="p-0">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-1 group-hover:text-eco-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} items
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-eco-warm/30 to-eco-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-eco-primary">
              What Our Community Says
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of happy buyers and sellers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-eco-primary text-white rounded-full flex items-center justify-center font-semibold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-eco-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Sustainable Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community today and discover the joy of sustainable shopping. 
            Every purchase makes a difference for our planet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-eco-primary hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                Join EcoFinds Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}