'use client'

interface ErrorProps {
    error: Error;
}

export default function Error( { error }: ErrorProps) {
    return (
        <p>Could not fetch product details. {error.message} {error.stack}</p>
    )
}