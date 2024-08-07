import "./App.css";
import { PrimaryButton, H1, P, Input } from "./components/CustomTags";

function App() {
  return (
    <>
      <div>
        <div className="">
          <H1 className="mb-2">
            Welcome to My E-Commerce Site
          </H1>
          <P className="mb-2">
            Explore a variety of products and find what you love!
          </P>
          <PrimaryButton onClick={() => alert("Button Clicked!")} className="mb-2">
            Shop Now
          </PrimaryButton>
          <Input type={"text"} className="mx-2"></Input>
        </div>
      </div>
    </>
  );
}

export default App;
