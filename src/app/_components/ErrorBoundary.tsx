import React, { ErrorInfo, ReactNode } from "react";

// Typing children
type Props = { 
    children: ReactNode,
    fallback: ReactNode,
}

type State = {
    hasError: boolean,
}

const Component = ({ children }: Props) => <div>{children}</div>


// https://ja.react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.log(error);
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;