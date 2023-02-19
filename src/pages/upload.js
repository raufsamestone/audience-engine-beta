import CsvUploader from "../components/csvUploader";

const UploadPage = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Upload your audience
          </h2>
        </div>
      </div>
      <div className="m-auto mt-10">
        <CsvUploader />
      </div>
    </div>
  );
};

export default UploadPage;
