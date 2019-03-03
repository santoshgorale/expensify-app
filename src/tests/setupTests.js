import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import DotEnv from "dotenv";

configure({ adapter: new Adapter() });
DotEnv.config({ path: ".env.test" });

// import Enzyme from "enzyme";
// import Adapter from "enzyme-adapter-react-16";

// Enzyme.configure({
//   adapter: new Adapter()
// });
