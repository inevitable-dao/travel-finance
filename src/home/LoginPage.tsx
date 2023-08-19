import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { PageTitle } from '@/components/PageTitle';

type CommonResponese<T> = {
  statusCode: number;
  timeStamp: string;
  path: string;
  result: T;
};

const LoginPage: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const login = useCallback(async () => {
    try {
      const res = await axios.post<CommonResponese<{ token: string }>>(
        'https://stevejkang.jp.ngrok.io/users/sign-in',
        { username: email, password: password },
      );

      localStorage.setItem('access_token', res.data.result.token);
      console.log({ res });
    } catch (e) {
      console.error(e);
    }
  }, [email, password]);

  const submit = () => {
    login();
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="text-white">
        <label>
          Username
          <input
            className="border-2 border-white"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password
          <input
            className="border-2 border-white"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={() => submit()}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
