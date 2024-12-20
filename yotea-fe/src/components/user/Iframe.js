const Iframe = ({ iframe }) => {
  return (
    <div
      className="h-full"
      dangerouslySetInnerHTML={{ __html: iframe || "" }}
    />
  );
};

export default Iframe;
