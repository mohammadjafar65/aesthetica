import { useState } from "react";
import { Plus, Trash2, X, CheckCircle } from "lucide-react";
import { Label } from "../../../components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import axios from "axios";
import { Spinner } from "../../../components/ui/spinner";

const AddWallpaper = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState([
    "Nature",
    "Abstract",
    "Cityscape",
    "Minimal",
    "Vintage",
    "Dark",
    "Bright",
    "Aesthetic",
    "Gradient",
    "Pastel",
    "Winter",
    "Anime",
    "Cozy",
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0 || !type) {
      alert("Please select at least one file and a type to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);

    files.forEach((file) => {
      formData.append("wallpaperImages", file);
    });

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/wallpapers/upload-multiple`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data);
      setIsLoading(false);
      setIsSuccess(true);
      setTitle("");
      setDescription("");
      setFiles([]);
      setType("");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert("Failed to upload wallpapers.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-blue-500 text-white">
          <Plus /> Add Wallpaper
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-transparent border-none min-[320px]:w-full">
        <DialogHeader>
          {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
          <DialogDescription>
            <Card className="w-[450px] min-[320px]:w-full bg-[#18181B] border-[216 34% 17%]">
              <CardHeader>
                <CardTitle className="text-white font-normal">
                  Add New Wallpaper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="text-white">
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title of the wallpaper"
                        className="max-w-sm bg-[#18181B] border-[216 34% 17%] focus-visible:ring-offset-0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="file">Wallpaper Images</Label>
                      <Input
                        type="file"
                        id="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setFiles(Array.from(e.target.files))}
                        className="max-w-sm bg-[#18181B] border-[216 34% 17%] focus-visible:ring-offset-0 text-white file:text-white"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description of wallpaper for SEO"
                        className="max-w-sm bg-[#18181B] border-[216 34% 17%] focus-visible:ring-offset-0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="type">Choose Type</Label>
                      <Select
                        value={type}
                        onValueChange={(value) => setType(value)}
                        placeholder="Select a Type"
                        className="w-full"
                      >
                        <SelectTrigger className="max-w-sm bg-[#18181B] border-[216 34% 17%] focus-visible:ring-offset-0">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent className="max-w-sm bg-[#18181B] border-[216 34% 17%] focus-visible:ring-offset-0 text-white">
                          <SelectItem value="Free">Free</SelectItem>
                          <SelectItem value="Pro">Exclusive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* <div className="flex flex-col space-y-1.5">
                      <Label>Tags</Label>
                      <div className="relative flex items-center gap-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          placeholder="Add a tag"
                          className="bg-[#18181B] border-[216 34% 17%]"
                          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                        />
                        <Button
                          type="button"
                          onClick={handleAddTag}
                          className="bg-blue-500 text-white"
                        >
                          Add
                        </Button>
                        {tagInput && (
                          <div className="absolute top-full mt-1 w-full bg-[#18181B] border border-gray-600 rounded-md shadow-lg max-h-48 overflow-auto z-10">
                            {suggestedTags
                              .filter((tag) =>
                                tag
                                  .toLowerCase()
                                  .includes(tagInput.toLowerCase())
                              )
                              .map((suggestedTag, index) => (
                                <div
                                  key={index}
                                  onClick={() =>
                                    handleSelectSuggestedTag(suggestedTag)
                                  }
                                  className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                                >
                                  {suggestedTag}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-blue-500 text-white px-2 py-1 rounded"
                          >
                            <span>{tag}</span>
                            <X
                              className="ml-2 cursor-pointer"
                              size={16}
                              onClick={() => handleRemoveTag(tag)}
                            />
                          </div>
                        ))}
                      </div>
                    </div> */}
                  </div>
                  <CardFooter className="flex justify-between w-full mt-5 p-0">
                    <Button
                      type="submit"
                      className="w-full bg-blue-500 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? <Spinner /> : "Upload"}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
      {isSuccess && (
        <DialogContent className="w-[300px] bg-[#18181B] border-[216 34% 17%] shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="text-green-500 w-12 h-12 mb-4" />
            <h3 className="text-lg font-medium">Upload Successful!</h3>
            <p>Your wallpapers have been uploaded successfully.</p>
            <Button
              onClick={() => setIsSuccess(false)}
              className="mt-4 bg-blue-500 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddWallpaper;
