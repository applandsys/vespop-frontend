import {ReduxProvider} from "@/providers/ReduxProvider";

export default function AdminRootLayout({ children }) {
    return (
        <ReduxProvider>
       <div>
           {children}
       </div>
        </ReduxProvider>
    );
}
