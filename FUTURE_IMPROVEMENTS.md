
## Current Notes

- The frontend currently calls a deployed Azure Functions URL directly from `requests.ts`.
- For better portability, move the API base URL into an environment variable such as `REACT_APP_API_BASE_URL`.
- The advert search trigger is prepared in the backend code, but the visible timer/route decorators are commented out. Enable the required trigger depending on whether the search should run by schedule, manually, or both.

## Suggested Improvements

- Add `.env.example` and `local.settings.example.json`.
- Move frontend API base URL to environment configuration.
- Add structured logging around DIM.RIA API failures.
- Add retry policy for external HTTP calls.
- Add dead-letter queue handling for failed Service Bus messages.
- Add Cosmos DB indexing/partitioning notes.
- Add unit tests for parsing and aggregation logic.
- Add integration tests for Azure Functions endpoints.
- Add CI for backend linting and tests.
- Add authentication if the API becomes public-facing.
