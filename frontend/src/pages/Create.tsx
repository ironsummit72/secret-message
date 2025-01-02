import { Button } from "../components/ui/button";

import { Helmet } from "react-helmet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../hooks/use-toast";
import { Input } from "../components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages, postCreateUser } from "../QueryFunction";
import axiosInstance from "../axios/axiosInstance";
import { login, logout } from "../redux/Slices/AuthSlice";
import { Check } from "lucide-react";
import Navbar from "@/components/custom/Navbar";
import { RefreshCcw } from "lucide-react"
const formSchema = z.object({
  fullname: z
    .string()
    .min(2, {
      message: "fullname cannot be empty",
    })
    .max(30, { message: "Fullname should not be more than 30 characters" })
    .trim(),
});
function App() {
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState<"Copy Link" | "Link copied">(
    "Copy Link"
  );
  const auth = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    axiosInstance
      .get("/currentuser")
      .then((res) => {
        if (res.data.user) {
          dispatch(login(res.data.user));
          setLink(`${window.origin}/secret/${res.data.user}`);
        }
      })
      .catch((error) => {
        logout();
        console.error(error);
      });
  }, [dispatch]);

  const mutation = useMutation({
    mutationFn: (user: string) => postCreateUser(user),
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      if (data) {
        toast({
          title: "created successfully ",
          description: data.data.message,
        });
        dispatch(login(data.data.user));
        setLink(`${window.origin}/secret/${data.data.user}`);
      }
    },
  });
  const { data: userdata } = useQuery({
    queryKey: ["userdetails"],
    queryFn: () => getMessages(),
  });

  const [link, setLink] = useState<string>("");

  const { toast } = useToast();
  const queryClient=useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (values) {
      mutation.mutate(values.fullname);
    }
  }
const handleOnRefresh=()=>{
  queryClient.invalidateQueries({queryKey:['userdetails']})
}
  if (auth.isUserauthenticated === false) {
    return (
      <>
    <Navbar/>
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 min-h-screen flex items-center justify-center">
          <Helmet>
            <title>secret-message</title>
          </Helmet>
          <Card className="min-w-[90%] md:min-w-[70%] lg:min-w-[60%] h-96 flex items-center justify-center">
            <CardContent className="w-full flex gap-5 justify-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-[100%] space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <div className="text-gray-500">
                          <ul className="flex flex-col gap-2">
                            <li>
                              Enter your Name, Create Secret Message link and
                              Share with your friends on Whatsapp, Instagram.
                            </li>
                            <li>
                              {" "}
                              Get anonymous feedback from your friends,
                              co-workers, and Fans.
                            </li>
                            <li>
                              Once your friends send you a message, you will see
                              the results on a Message board.
                            </li>
                          </ul>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full md:w-20" type="submit">
                    Send
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  } else {
    return (
    <>
    <Navbar/>
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 min-h-screen flex flex-col gap-20 items-center justify-center">
        {/* message responses above and copy link below */}
        <Card className="min-w-[90%] md:min-w-[70%] lg:min-w-[50%] lg:h-52 h-52 flex items-center justify-center mt-10">
          <CardContent className="flex flex-col gap-5 w-[90%]">
            <h2 className="text-gray-500">
              Hi,{" "}
              <span title="Your name" className="text-black font-medium">
                {userdata?.data.fullname}
              </span>{" "}
              Your link has been generated Successfully
            </h2>
            <Input  className="w-[100%]" defaultValue={link} readOnly />
            <Button title="Copy Link"
              className={`lg:w-28 lg:px-20 w-full ${
                buttonText === "Link copied"
                  ? "bg-green-500 hover:bg-green-600"
                  : ""
              }`}
              onClick={() => {
                copy(link);
                setButtonText("Link copied");
              }}
            >
              {buttonText}
              {buttonText === "Link copied" ? <Check /> : ""}
            </Button>
          </CardContent>
        </Card>
        <Card className="min-w-[90%] md:min-w-[70%] lg:min-w-[50%] lg:h-auto h-auto flex flex-col items-center justify-start h-auto mb-20 mx-7">
          <CardHeader ><div>
          Message Responses <Button title="Refresh" onClick={handleOnRefresh} className="w-fit" variant={'ghost'}><RefreshCcw/></Button>
            </div></CardHeader>
          <CardContent className="flex flex-col gap-5 w-[90%] h-auto">
            {userdata?.data.messages.map((messages: string, index: number) => (
              <div
                key={messages + index}
                className="border-2 border-black p-2 rounded-lg w-[95%] h-auto"
              >
                {messages}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
    );
  }
}
export default App;
