import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appWrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost =
          userData &&
          (await appwriteService.createPost({
            ...data,
            userId: userData.$id,
          }));

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-8 py-10">
      {/* Main Content Area */}
      <div className="flex-grow space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <Input
            label="Post Title"
            placeholder="Enter a catchy title..."
            className="mb-6"
            {...register("title", { required: true })}
          />
          <Input
            label="URL Slug"
            placeholder="post-slug-automatically-generated"
            className="mb-8"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <div className="mt-8">
            <label className="inline-block mb-3 pl-1 text-sm font-semibold text-slate-700">Write your stories</label>
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner">
              <RTE
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Area */}
      <div className="w-full lg:w-[400px] flex-shrink-0 space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
          <Input
            label="Featured Image"
            type="file"
            className="mb-6 block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-primary/10 file:text-primary
              hover:file:bg-primary/20 transition-all cursor-pointer"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />

          {post && (
            <div className="w-full mb-6 group relative rounded-2xl overflow-hidden shadow-md">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Post Status"
            className="mb-8"
            {...register("status", { required: true })}
          />

          <Button
            type="submit"
            bgColor={post ? "bg-green-500 hover:bg-green-600 shadow-green-200" : "bg-primary hover:bg-primary-dark shadow-primary/20"}
            className="w-full py-4 text-lg tracking-wide transform hover:-translate-y-1"
          >
            {post ? "Update Content" : "Publish Story"}
          </Button>

          <p className="mt-4 text-center text-xs text-slate-400 font-medium">
            * Changes are saved immediately upon publishing.
          </p>
        </div>
      </div>
    </form>
  );
}
