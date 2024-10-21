import React, { useState, useEffect } from 'react';
import bus from '../../../utils/bus';
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
    Container,
    MessageContent,
    Button,
    About,
    Progress,
    BarLine
} from './styles';

interface IFlash {
    message: string;
    type: string;
}

const Message: React.FC = () => {
    const [visibility, setVisibility] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const [percentLine, setPercentLine] = useState(100);

    useEffect(() => {
        const flashHandler = ({ message, type }: IFlash) => {
            setVisibility(true);
            setMessage(message);
            setType(type);
            setPercentLine(100);

            const duration = 5000;
            const interval = duration / 100;

            const intervalId = setInterval(() => {
                setPercentLine(prev => {
                    if (prev <= 0) {
                        clearInterval(intervalId);
                        return 0;
                    }
                    return prev - 1;
                });
            }, interval);

            setTimeout(() => {
                setVisibility(false);
            }, duration);
        };

        bus.addListener('flash', flashHandler);

        return () => {
            bus.removeListener('flash', flashHandler);
        };
    }, []);

    if (!visibility) {
        return null;
    }

    const closeMessage = () => {
        setVisibility(false);
    };

    return (
        <Container $type={type}>
            <About>
                <MessageContent>{message}</MessageContent>
                <Button onClick={closeMessage}><IoIosCloseCircleOutline /></Button>
            </About>
            <Progress>
                <BarLine $type={type} $percentLine={percentLine} />
            </Progress>
        </Container>
    );
};

export default Message;