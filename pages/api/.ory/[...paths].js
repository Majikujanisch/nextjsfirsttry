// @ory/integrations offers a package for integrating with Next.js.
import { config, createApiHandler } from "@ory/integrations/next-edge"

// We need to export the config.
export { config }

// And create the Ory Cloud API "bridge".
export default createApiHandler({
  fallbackToPlayground: true,
})

//sdk
import { Configuration, V0alpha2Api } from '@ory/client'

export const ory = new V0alpha2Api(
  new Configuration({
    basePath: `http://localhost:4000/api/.ory`,

    // NEVER prefix this with NEXT_PUBLIC or your personal access token will be leaked in your build!
    accessToken: process.env.ORY_ACCESS_TOKEN
  })
)