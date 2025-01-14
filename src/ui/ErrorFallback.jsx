import Button from "./Button";
import Heading from "./Heading";
Button;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-gray-100
    "
    >
      <div className="p-5 bg-slate-50 rounded-xl text-center">
        <Heading as="h1">SOMETHING WENT WRONG FAM!🫂</Heading>
        <p className="text-xl">({error.message})</p>
        <div className="flex justify-center p-10">
          <iframe
            width="460"
            height="215"
            src="https://www.youtube.com/embed/9sXlaBa75Iw?si=KY5OXMTFbM_LANcw"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            style={{
              borderRadius: "20px",
            }}
          ></iframe>
        </div>
        <Button
          onClick={resetErrorBoundary}
          buttonContainer={"flex justify-center"}
          text={"TRY AGAIN"}
          style={
            "flex justify-center items-center p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md w-6/12"
          }
        />{" "}
      </div>
    </div>
  );
}
export default ErrorFallback;
