import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import { PageTitle } from '@/components/PageTitle';

type CommonResponse<T> = {
  statusCode: number;
  timeStamp: string;
  path: string;
  result: T;
};

const SignupPage: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const signup = useCallback(async () => {
    try {
      const res = await axios.post<CommonResponse<{}>>(
        'https://stevejkang.jp.ngrok.io/users/sign-up',
        { username: email, password: password },
      );

      console.log({ res });
      router.push('/');
    } catch (e: any) {
      console.error(e);
      window.alert('Error: ' + e.message);
    }
  }, [email, password, router]);

  return (
    <div className="flex flex-col items-center justify-center mt-[64px]">
      <PageTitle description="Login to use all features">Signup</PageTitle>

      <div className="flex flex-col w-full max-w-sm gap-3">
        <div className="flex flex-col gap-1.5 px-4 py-3 border border-solid rounded-md bg-zinc-900 border-zinc-800">
          <label
            className="text-md text-slate-50"
            style={{ fontFamily: 'koverwatch' }}
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            className="p-3 text-white border-0 rounded-sm shadow-lg text-md bg-zinc-800 shadow-zinc-900"
            onChange={(e) => setEmail(e.target.value)}
            // on enter, move to password input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                document.getElementById('password')?.focus();
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5 px-4 py-3 border border-solid rounded-md bg-zinc-900 border-zinc-800">
          <label
            htmlFor="password"
            className="text-md text-slate-50"
            style={{ fontFamily: 'koverwatch' }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="p-3 text-white border-0 rounded-sm shadow-lg text-md bg-zinc-800 shadow-zinc-900"
            onChange={(e) => setPassword(e.target.value)}
            // on enter, submit
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                signup();
              }
            }}
          />
        </div>
        <Button type="button" className="w-full" onClick={() => signup()}>
          Signup
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;
