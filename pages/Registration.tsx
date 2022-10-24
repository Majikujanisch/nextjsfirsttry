import {
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody,
} from "@ory/kratos-client"
import { CardTitle } from "@ory/themes"
import { AxiosError } from "axios"
import type { NextPage } from "next"
import Head from "next/head"
import { useRouter, NextRouter } from "next/router"
import { useEffect, useState } from "react"
import Metacall from "../component/MetadataButton"
// Import render helpers
import { Flow, ActionCard, CenterLink, MarginCard } from "../pkg"
import { handleFlowError } from "../pkg/errors"
// Import the SDK
import ory from "../pkg/sdk"

// Renders the registration page
const Registration: NextPage = () => {
  const router = useRouter()

  // The "flow" represents a registration process and contains
  // information about the form we need to render (e.g. username + password)
  const [flow, setFlow] = useState<SelfServiceRegistrationFlow>()

  // Get ?flow=... from the URL
  const { flow: flowId, return_to: returnTo } = router.query

  // In this effect we either initiate a new registration flow, or we fetch an existing registration flow.
  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getSelfServiceRegistrationFlow(String(flowId))
        .then(({ data }) => {
          // We received the flow - let's use its data and render the form!
          setFlow(data)
        })
        .catch(handleFlowError(router, "registration", setFlow))
      return
    }

    // Otherwise we initialize it
    ory
      .initializeSelfServiceRegistrationFlowForBrowsers(
        returnTo ? String(returnTo) : undefined,
      )
      .then(({ data }) => {
        setFlow(data)
      })
      .catch(handleFlowError(router, "registration", setFlow))
  }, [flowId, router, router.isReady, returnTo, flow])

  const onSubmit = (values: SubmitSelfServiceRegistrationFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/Registration?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .submitSelfServiceRegistrationFlow(String(flow?.id), values)
          .then(({ data }) => {
            router.push("/")
          }).then(() => {})
          .catch(handleFlowError(router, "registration", setFlow))
          .catch((err: AxiosError) => {
            // If the previous handler did not catch the error it's most likely a form validation error
            if (err.response?.status === 400) {
              // Yup, it is!
              setFlow(err.response?.data)
              return
            }
          }),
          
      )
      

  return (
    <>
      <Head>
        <title>Create account - Ory NextJS Integration Example</title>
        <meta name="description" content="NextJS + React + Vercel + Ory" />
      </Head>
      <MarginCard>
        <CardTitle>Create account</CardTitle>
        <Flow onSubmit={onSubmit} flow={flow} />
      </MarginCard>
      <ActionCard>
        <CenterLink data-testid="cta-link" href="/Login">
          Sign in
        </CenterLink>
      </ActionCard>
    </>
  )
}

export default Registration
