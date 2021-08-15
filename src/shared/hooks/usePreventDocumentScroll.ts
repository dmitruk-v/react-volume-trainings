const usePreventDocumentScroll = (preventCondition: boolean) => {
  document.body.style.overflow = preventCondition ? "hidden" : "auto";
  if (window.innerHeight < document.body.scrollHeight) {
    document.body.style.paddingRight = preventCondition ? "17px" : "0";
  }
};

export { usePreventDocumentScroll }