import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fileDataProps, variantInfo } from "@/types/product";
import cloudinaryUploader from "@/utils/cloudinary";
const AddNewVariant = ({
  variants,
  setVariants,
}: {
  variants: variantInfo[];
  setVariants: React.Dispatch<React.SetStateAction<variantInfo[]>>;
}) => {
  const [newVariant, setNewVariant] = useState<variantInfo>({
    additionalCost: 0,
    name: "",
    images: [],
  });

  const [fileData, setFileData] = useState<fileDataProps>({
    fileName: "",
    type: "",
    file: null,
  });

  const fileUploader = async () => {
    const data = await cloudinaryUploader({
      ele: fileData.file!,
      location: "chat-media",
      type: fileData.type,
    });
    return data;
  };

  const fileHandler = async (Files: FileList) => {
    const file = Files[0];
    const type = file.type.split("/")[0];
    setFileData({
      ...fileData,
      fileName: file.name,
      type: type,
      file: file,
    });
  };
  async function submitHandler(formData: FormData) {}
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          Add new variant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Variant</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="sm:grid sm:grid-cols-4 flex flex-col sm:items-center gap-2 sm:gap-4">
            <Label htmlFor="name" className="sm:text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={newVariant.name}
              onChange={(e) =>
                setNewVariant({ ...newVariant, name: e.target.value })
              }
            />
          </div>
          <div className="sm:grid sm:grid-cols-4 flex flex-col sm:items-center gap-2 sm:gap-4">
            <Label htmlFor="name" className="sm:text-right">
              Additional Cost
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={newVariant.additionalCost}
              type="number"
              onChange={(e) =>
                setNewVariant({
                  ...newVariant,
                  additionalCost: e.target.valueAsNumber,
                })
              }
            />
          </div>
          <div className="sm:grid sm:grid-cols-4 flex flex-col sm:items-center gap-2 sm:gap-4">
            <Label htmlFor="name" className="sm:text-right">
              Images
            </Label>
            <div className="flex flex-col gap-1 col-span-3">
              <Input
                id="name"
                className="w-full"
                type="file"
                required
                onChange={(e) => {
                  fileHandler(e.target.files!);
                }}
              />
              <div className="flex gap-2 flex-wrap">
                {newVariant?.images?.map((image, key) => {
                  return <img src={image} key={`newvariant-image-${key}`} />;
                })}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewVariant;
