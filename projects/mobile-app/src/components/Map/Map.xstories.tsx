const blank = {};
export default blank;
// import React, { FC, useState } from "react";
// import { Story, Meta } from "@storybook/react/types-6-0";

// import { Map, MapProps } from "./Map";
// import withPadding from "../../utils/withPadding";
// import "leaflet/dist/leaflet.css";
// // export default {
// //   title: "Components/Map",
// //   component: Map,
// //   argTypes: {},
// //   decorators: [withPadding],
// // } as Meta;

// const Template: Story<MapProps> = (args) => <Map {...args} />;

// export default {
//   title: "Maps",
//   decorators: [withPadding],
// } as Meta;

// export const MapHere1 = () => {
//   const myItems = [
//     {
//       name: "Bob's Burgers",
//       location: [34.052344, -118.476],
//       image: "https://ui-avatars.com/api/?background=random&name=Bobs+Burgers&size=36",
//     },
//     {
//       name: "Taco Cantina",
//       location: [34.064344, -118.476],
//       image: "https://ui-avatars.com/api/?background=random&name=Taco+Cantina&size=36",
//     },
//     {
//       name: "Purple Pasta",
//       location: [34.054344, -118.446],
//       image: "https://ui-avatars.com/api/?background=random&name=Purple+Pasta&size=36",
//     },
//     {
//       name: "Harrys Hot Dogs",
//       location: [34.052332, -118.454],
//       image: "https://ui-avatars.com/api/?background=random&name=Larrys+Hot+Dogs&size=36",
//     },
//   ];

//   const [merchants, setMerchants] = useState(myItems);
//   const handlePan = (panned: any) => {
//     console.log("3) Panned, getting more merchants!");
//     setMerchants([
//       ...merchants,
//       {
//         name: "More Hot Dogs",
//         location: [34.052432, -118.452],
//         image:
//           "https://ui-avatars.com/api/?background=random&name=Marys+Hot+Dogs&size=36",
//       },
//     ]);
//   };

//   return (
//     <Frame>
//       <div className="w-96 h-96 ">
//         {/* <Map
//           data={merchants}
//           initialCenter={[34.052332, -118.454]}
//           onChange={handlePan}
//         /> */}
//       </div>
//     </Frame>
//   );
// };

// const Frame: FC = ({ children }) => {
//   const onClickHandler = (id: string) => {
//     console.log("onTabClick", id);
//   };

//   return (
//     <div className="relative flex flex-col bg-lines" style={{ width: 375, height: 812 }}>
//       <div className="flex items-center justify-center py-10 flex-shink-0"></div>

//       {children}
//     </div>
//   );
// };

// // export const Primary = Template.bind({});
// // Primary.args = {
// //   data: myItems,
// //   initialCenter: [34.052332, -118.454],
// //   onChange: handlePan,
// // };
