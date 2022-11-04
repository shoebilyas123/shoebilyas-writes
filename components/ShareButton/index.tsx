import React from "react";
import { HiShare } from "react-icons/hi";
import Button from "shoebilyas-common/components/Button";

interface IProps {
  title: string;
  text: string;
  slug: string;
}

const ShareButton: React.FC<IProps> = ({ slug, title, text }) => {
  const webshareHandler = async () => {
    const shareData = {
      title,
      text,
      url: `https://shoebilyas.com/blogs/${slug}`,
    };

    try {
      await navigator.share(shareData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={webshareHandler}
      className="border w-fit h-fit border-white p-2 rounded-lg hover:bg-white hover:text-zinc-900 transition-all"
    >
      <HiShare />
      {/* Share */}
    </Button>
  );
};

export default ShareButton;
