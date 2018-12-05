# neversaw.us worker

This worker powers www.neversaw.us, and also acts as the roccoco cherub on the
ceiling. It is overkill.

## project reqs:

- I want my existing email to keep working
- I have static content I want to serve with no processing
- I have another site, unbearablecomics.com, that needs to be served statically
- I want to write posts using markdown and upload them to S3
    - I want to render the posts using cloudflare workers
        - I fully, freely admit that this is an indulgence, a luxury, an unnecessary complication
        - The roccoco cherub painted on the ceiling, so to speak
    - I want the cloudflare worker to generate:
        - RSS
        - list pages

## License

MIT
