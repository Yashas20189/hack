import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  Edit,
  Trash2,
  Plus,
  Eye,
  Star,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [profile, setProfile] = useState({
    username: "EcoShopper123",
    email: "user@example.com",
    joinDate: "March 2024",
    rating: 4.8,
    reviews: 24
  });

  const stats = [
    {
      title: "Total Sales",
      value: "$1,250",
      icon: <DollarSign className="w-5 h-5" />,
      change: "+12%",
      positive: true
    },
    {
      title: "Items Sold",
      value: "15",
      icon: <Package className="w-5 h-5" />,
      change: "+3",
      positive: true
    },
    {
      title: "Items Bought",
      value: "8",
      icon: <ShoppingBag className="w-5 h-5" />,
      change: "+2",
      positive: true
    },
    {
      title: "Rating",
      value: "4.8",
      icon: <Star className="w-5 h-5" />,
      change: "+0.1",
      positive: true
    }
  ];

  const myListings = [
    {
      id: 1,
      title: "Vintage Camera",
      price: 150,
      status: "Active",
      views: 24,
      likes: 5,
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      title: "Designer Boots",
      price: 85,
      status: "Sold",
      views: 42,
      likes: 12,
      image: "/api/placeholder/80/80"
    },
    {
      id: 3,
      title: "Gaming Headset",
      price: 60,
      status: "Active",
      views: 18,
      likes: 3,
      image: "/api/placeholder/80/80"
    }
  ];

  const purchases = [
    {
      id: 1,
      title: "Leather Jacket",
      price: 120,
      seller: "VintageStyle",
      status: "Delivered",
      date: "2024-01-15",
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      title: "Coffee Table",
      price: 85,
      seller: "FurnitureFinder",
      status: "In Transit",
      date: "2024-01-20",
      image: "/api/placeholder/80/80"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-eco-primary">Dashboard</h1>
          <p className="text-muted-foreground">Manage your EcoFinds activity</p>
        </div>
        <Link to="/sell">
          <Button className="bg-eco-primary hover:bg-eco-primary-light">
            <Plus className="w-4 h-4 mr-2" />
            List New Item
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="border-eco-warm/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-eco-primary/10 rounded-lg">
                  {stat.icon}
                </div>
                <Badge 
                  variant={stat.positive ? "default" : "destructive"}
                  className={stat.positive ? "bg-eco-success" : ""}
                >
                  {stat.change}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-eco-primary">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="purchases">Purchase History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-eco-warm/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-eco-primary">
                <Edit className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-eco-primary text-white text-xl">
                    {profile.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{profile.username}</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{profile.rating} ({profile.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Joined {profile.joinDate}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
              </div>

              <Button className="bg-eco-primary hover:bg-eco-primary-light">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Listings Tab */}
        <TabsContent value="listings" className="space-y-6">
          <Card className="border-eco-warm/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-eco-primary">
                <Package className="w-5 h-5" />
                My Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myListings.map((listing) => (
                  <div key={listing.id} className="flex items-center space-x-4 p-4 border border-eco-warm/50 rounded-lg">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{listing.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>${listing.price}</span>
                        <Badge variant={listing.status === "Active" ? "default" : "secondary"} className={listing.status === "Active" ? "bg-eco-success" : ""}>
                          {listing.status}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {listing.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          ❤️ {listing.likes}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Purchase History Tab */}
        <TabsContent value="purchases" className="space-y-6">
          <Card className="border-eco-warm/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-eco-primary">
                <ShoppingBag className="w-5 h-5" />
                Purchase History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="flex items-center space-x-4 p-4 border border-eco-warm/50 rounded-lg">
                    <img
                      src={purchase.image}
                      alt={purchase.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{purchase.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>${purchase.price}</span>
                        <span>Sold by {purchase.seller}</span>
                        <span>{purchase.date}</span>
                        <Badge variant={purchase.status === "Delivered" ? "default" : "secondary"} className={purchase.status === "Delivered" ? "bg-eco-success" : ""}>
                          {purchase.status}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-eco-warm/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-eco-primary">
                  <TrendingUp className="w-5 h-5" />
                  Sales Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>This Month</span>
                    <span className="font-semibold text-eco-primary">$450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Last Month</span>
                    <span className="font-semibold">$320</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average per Item</span>
                    <span className="font-semibold">$75</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-eco-warm/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-eco-primary">
                  <Eye className="w-5 h-5" />
                  Listing Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Views</span>
                    <span className="font-semibold text-eco-primary">284</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>This Week</span>
                    <span className="font-semibold">56</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Conversion Rate</span>
                    <span className="font-semibold">12.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}