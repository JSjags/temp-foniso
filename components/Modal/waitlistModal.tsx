// import { Dispatch, SetStateAction, useState } from "react";
// import { Dialog } from "@headlessui/react";
// import { IoClose } from "react-icons/io5";
// import { twMerge } from "tailwind-merge";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import Spinner from "../Spinner";
// import { showToast } from "../Toastify";

// type PropType = {
//   isOpen: boolean;
//   setIsOpen: Dispatch<SetStateAction<boolean>>;
// };

// const schema = yup.object().shape({
//   email: yup.string().required("Please provide your email"),
// });

// export function DownloadModal(props: PropType) {
//   const [isLoading, setIsLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitSuccessful, isSubmitted },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = (data: { email: string }) => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     const requestOptions = {
//       method: "post",
//       headers: myHeaders,
//       // redirect: "follow",
//       body: JSON.stringify([[data.email, new Date().toISOString()]]),
//     };

//     setIsLoading(true);

//     fetch(
//       "https://v1.nocodeapi.com/bisoladev/google_sheets/rEqQsvzqNoifwyQE?tabId=Sheet1",
//       requestOptions
//     )
//       .then((response) => response.text())
//       .then((result) => {
//         console.log(result, "result");
//         showToast.success("Email has been submitted successfully");
//       })
//       .catch((error) => console.log("error", error))
//       .finally(() => {
//         setIsLoading(false);
//         // setTimeout(() => {
//         reset();
//         // }, 1000);
//       });
//   };
//   return (
//     <Dialog
//       open={props.isOpen}
//       onClose={() => props.setIsOpen(false)}
//       className="relative z-50"
//     >
//       <div className="fixed inset-0 bg-black/30" aria-hidden="true">
//         <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
//           <Dialog.Panel className="w-full max-w-lg rounded-[20px] bg-[#0C0F0E] py-6 px-10 pb-10">
//             <div className="flex justify-end">
//               <button
//                 onClick={() => props.setIsOpen(false)}
//                 className={twMerge(
//                   "bg-[#393B3A] rounded-full w-7 h-7",
//                   "flex items-center justify-center remove-highlight outline-none"
//                 )}
//               >
//                 <IoClose className="text-white " />
//               </button>
//             </div>
//             <Dialog.Title className="flex justify-center"></Dialog.Title>
//             <Dialog.Description className="text-xl md:text-2xl xl:text-[32px] leading-tight font-bold text-colorWhite py-4">
//               Join our exclusive waitlist for early access and be part of the
//               excitement
//             </Dialog.Description>

//             <form onSubmit={handleSubmit(onSubmit)} className="">
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="email"
//                   className="text-[#d6d6d6] lg:text-lg text-base mb-1.5"
//                 >
//                   Your email address
//                 </label>
//                 <input
//                   type="email"
//                   className="bg-transparent border border-solid border-[#393939] py-2.5 rounded-lg text-colorWhite px-2"
//                   {...register("email")}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 transition-all">
//                     {errors.email.message}
//                   </p>
//                 )}
//                 {/* {isSubmitted && !isLoading && isSubmitSuccessful && (
//                   <div className="flex items-center pt-2">
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 16 16"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <rect width="16" height="16" rx="8" fill="#4ED17E" />
//                       <path
//                         d="M6.49995 9.85737L4.52117 7.87859L4.39995 7.75737L4.27873 7.87859L3.57873 8.57859L3.45751 8.6998L3.57873 8.82102L6.37873 11.621L6.49995 11.7422L6.62117 11.621L12.6212 5.62102L12.7424 5.4998L12.6212 5.37859L11.9212 4.67859L11.8 4.55737L11.6787 4.67859L6.49995 9.85737Z"
//                         fill="#222623"
//                         stroke="#222623"
//                         stroke-width="0.342857"
//                       />
//                     </svg>

//                     <p className="text-[#22C55E] text-base transition-all pl-2">
//                       Email has been submitted
//                     </p>
//                   </div>
//                 )} */}
//               </div>
//               <button
//                 type="submit"
//                 className="bg-[#F2FFF7] border-none rounded-lg py-2 w-full font-bold lg:text-lg text-base mt-7"
//                 disabled={isLoading}
//               >
//                 {isLoading ? <Spinner /> : "Join our waitlist"}
//               </button>
//             </form>
//           </Dialog.Panel>
//         </div>
//       </div>
//     </Dialog>
//   );
// }
