import { motion } from 'motion/react'
import { Fragment } from 'react/jsx-runtime'
import { Card, CardContent } from '../ui/card'

interface PageContainerProps {
  children: React.ReactNode
}

function PageContainer({ children }: PageContainerProps) {
  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className=" w-full"
    >
      <div className="flex flex-col gap-8  w-full">{children}</div>
    </motion.div>
  )
}

interface PageHeaderProps {
  children: React.ReactNode
}

function PageHeader({ children }: PageHeaderProps) {
  return (
    <div className="flex flex-1 flex-col justify-between gap-2 ">
      {children}
    </div>
  )
}

function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl font-bold tracking-tight text-foreground">
      {children}
    </h1>
  )
}

function PageDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground">{children}</p>
}

function PageActions({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>
}

function PageContent({
  children,
  container,
}: {
  children: React.ReactNode
  container?: boolean
}) {
  return (
    <Fragment>
      {container ? (
        <Card className="border-none! shadow-lg">
          <CardContent>{children}</CardContent>
        </Card>
      ) : (
        <div className="w-full flex flex-col gap-4">{children}</div>
      )}
    </Fragment>
  )
}

export {
  PageContainer,
  PageHeader,
  PageTitle,
  PageDescription,
  PageActions,
  PageContent,
}
