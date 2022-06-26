import React from "react";
const useLoading = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const initiateLoading = () => {
    // document.body.style.overflowY = "hidden";
    setLoading(true);
  };

  const cancelLoading = () => {
    setLoading(false);
  };
  return { loading, initiateLoading, cancelLoading };
};

export default useLoading;
