import {useEffect} from "react";
import {clearMessages} from "../../store/base/baseActions.ts";
import {Message} from "../../store/base/baseSlice.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {AppDispatch} from "../../store/store.ts";
import Alert from "../Alert/Alert.tsx";
import { v4 as uuid } from 'uuid';

const Messages = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const messages: Message[] = useAppSelector((state) => state.base.messages);

  useEffect(() => {
    let clearMessageTimeout: NodeJS.Timeout;

    if (messages && messages.length > 0) {
      clearMessageTimeout = setTimeout(() => {
        dispatch(clearMessages());
      }, 4000);
    }

    return () => {
      if (clearMessageTimeout) {
        clearTimeout(clearMessageTimeout);
      }
    };
  }, [dispatch, messages]);

  return (
  <>
    {messages && messages.map(message => (
      <Alert message={message} key={uuid()} />
    ))}
  </>
  );
}

export default Messages;
