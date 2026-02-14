export default function SmallCard({children}) {
  return (
    <>
         <div className="bg-[#f4f6fa] p-2 rounded-lg flex justify-center items-center">
          {children}
        </div>
    </>
  )
};