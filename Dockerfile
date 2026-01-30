FROM node:24-slim AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
RUN pnpm i
RUN pnpm build

FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
