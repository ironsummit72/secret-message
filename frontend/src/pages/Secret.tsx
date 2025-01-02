import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserDetails, patchCreateMessage } from "@/QueryFunction";
const formSchema = z.object({
  message: z
    .string()
    .min(2, {
      message: "Message cannot be empty",
    })
    .max(100, { message: "Message should not be more than 100 characters" })
    .trim(),
});
function Secret() {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: userdata } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserDetails(id!),
    enabled: !!id,
  });
  const mutation = useMutation({
    mutationFn: (data: { message: string; userId: string }) =>
      patchCreateMessage(data.message, data.userId),
    mutationKey: ["message", id],
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      toast({
        title: "message sent successfully",
        description: data?.data.message,
      });
      form.resetField('message');
    },
  });


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (values) {
      mutation.mutate({ message: values.message, userId: id! });
    }
  }
  return (
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Let's play and have fun with {userdata?.data.fullname}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What's On Your Mind?"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <div className="text-gray-500">
                      <ul className="flex flex-col gap-2">
                        <li>
                          Send your message secretly to{" "}
                          <span className="text-black font-medium">
                            {userdata?.data.fullname}
                          </span>
                          .
                        </li>
                        <li>
                          <span className="text-black font-medium">
                            {userdata?.data.fullname}
                          </span>{" "}
                          will never know who send the message.
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
  );
}
export default Secret;
