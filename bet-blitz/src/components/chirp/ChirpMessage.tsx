import React, { useState, useRef } from 'react';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { toast } from "~/components/ui/use-toast"

const loaderSkeleton =
  <div className="flex flex-col rounded shadow-md sm:w-80 animate-pulse h-fit">
    <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-400">
      <div className="w-full h-12 rounded bg-gray-300"></div>
      <div className="w-full h-12 rounded bg-gray-300"></div>
      <div className="w-full h-12 rounded bg-gray-300"></div>
      <div className="flex items-center justify-center text-gray-500 font-extralight text-center w-full h-12 rounded bg-gray-300">Generating your message, please do not refresh.</div>
      <div className="flex items-center justify-center text-gray-500 font-extralight text-center w-full h-12 rounded bg-gray-300">This may take awhile</div>
      <div className="w-full h-12 rounded bg-gray-300"></div>
      <div className="w-full h-12 rounded bg-gray-300"></div>
      <div className="w-3/4 h-12 rounded bg-gray-300"></div>
    </div>
  </div>

interface MyComponentProps {
  message: string;
  loading: boolean;
}

const ChirpMessage: React.FC<MyComponentProps> = ({ message, loading }) => {
  const [displayText, setDisplayText] = useState('');
  const textRef = useRef(null);

  //   const copyToClipboard = () => {
  //     textRef.current.select();
  //     document.execCommand('copy');
  //   };

  const startTypewriterAnimation = () => {
    let index = 0;
    const interval = setInterval(() => {
      if (index === message.length) {
        clearInterval(interval);
      } else {
        setDisplayText((prevText) => prevText + message[index]);
        index++;
      }
    }, 100); // Adjust the animation speed as needed
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    toast({
      title: "Sucessfully copied to clipboard!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Now you can send to your friend!</code>
        </pre>
      ),
    });
  }

  // Start the typewriter animation when the component is mounted
  React.useEffect(() => {
    //startTypewriterAnimation();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-full'>
        {loaderSkeleton}
      </div>
    );
  }

  if (message === "") {
    return (
      <div className='flex items-center justify-center h-full text-3xl font-extrabold'>
        <div className='w-2/3 text-center'>
          Fill out the form on the left and click submit to generate a message that lets your friend know they are bad at sports betting.
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center h-full'>
      {
        loading ?
          loaderSkeleton :
          <Card className='bg-gray-300 p-4 w-2/3'>

            <div className='flex flex-row-reverse'>
              <Button
                onClick={handleCopy}
              >Copy</Button>
            </div>

            <Card className='bg-black text-white p-4 mt-2 font-light'>
              {message}
            </Card>
          </Card>
      }
    </div>
  );
};

export default ChirpMessage;

{/* <p className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-black font-bold">{message}</p>
        <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-black font-bold">{message}</h1> */}
