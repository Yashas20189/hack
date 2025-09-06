import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  X, 
  Camera, 
  Package, 
  DollarSign,
  Tag,
  FileText,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SellItem() {
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    price: '',
    originalPrice: '',
    brand: '',
    size: '',
    color: '',
    material: ''
  });

  const categories = [
    'Fashion',
    'Electronics',
    'Home & Garden',
    'Books',
    'Sports & Outdoors',
    'Toys & Games',
    'Collectibles',
    'Automotive',
    'Other'
  ];

  const conditions = [
    { value: 'new', label: 'New (with tags)', description: 'Never worn/used, original tags attached' },
    { value: 'excellent', label: 'Excellent', description: 'Like new, no visible flaws' },
    { value: 'good', label: 'Good', description: 'Minor signs of wear, good condition' },
    { value: 'fair', label: 'Fair', description: 'Noticeable wear but fully functional' },
    { value: 'poor', label: 'Poor', description: 'Significant wear, may need repairs' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && images.length < 5) {
          setImages(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.condition || !formData.price) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: "Add photos",
        description: "Please add at least one photo of your item.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Listing created!",
        description: "Your item is now live on the marketplace. Good luck with your sale!",
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        condition: '',
        price: '',
        originalPrice: '',
        brand: '',
        size: '',
        color: '',
        material: ''
      });
      setImages([]);
    }, 1500);
  };

  const savings = formData.originalPrice && formData.price 
    ? Number(formData.originalPrice) - Number(formData.price)
    : 0;

  const savingsPercent = formData.originalPrice && formData.price 
    ? Math.round((savings / Number(formData.originalPrice)) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-eco-primary mb-2">List Your Item</h1>
          <p className="text-muted-foreground">
            Give your pre-loved items a new life while earning some extra cash
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Photos Section */}
          <Card className="border-eco-warm/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-eco-primary">
                <Camera className="w-5 h-5" />
                Photos (Required)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Add up to 5 photos. The first photo will be your main listing image.
                </p>
                
                {/* Image Upload Area */}
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg border border-eco-warm"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-eco-primary text-white text-xs">
                          Main
                        </Badge>
                      )}
                    </div>
                  ))}
                  
                  {images.length < 5 && (
                    <label className="aspect-square border-2 border-dashed border-eco-warm hover:border-eco-primary transition-colors cursor-pointer rounded-lg flex flex-col items-center justify-center">
                      <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card className="border-eco-warm/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-eco-primary">
                <FileText className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="What are you selling?"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item in detail..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Condition *</Label>
                  <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition.value} value={condition.value}>
                          <div>
                            <div className="font-medium">{condition.label}</div>
                            <div className="text-xs text-muted-foreground">{condition.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="border-eco-warm/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-eco-primary">
                <DollarSign className="w-5 h-5" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Your Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price (Optional)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    placeholder="0.00"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                  />
                </div>
              </div>

              {savings > 0 && (
                <div className="p-4 bg-eco-success/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-eco-success" />
                    <span className="font-medium text-eco-success">
                      Buyers save ${savings} ({savingsPercent}% off retail price)
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card className="border-eco-warm/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-eco-primary">
                <Tag className="w-5 h-5" />
                Additional Details (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    placeholder="Brand name"
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    placeholder="Size"
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    placeholder="Color"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    placeholder="Material"
                    value={formData.material}
                    onChange={(e) => setFormData({...formData, material: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="button" variant="outline" className="flex-1">
              Save as Draft
            </Button>
            <Button type="submit" className="flex-1 bg-eco-primary hover:bg-eco-primary-light">
              <Package className="w-4 h-4 mr-2" />
              List Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}