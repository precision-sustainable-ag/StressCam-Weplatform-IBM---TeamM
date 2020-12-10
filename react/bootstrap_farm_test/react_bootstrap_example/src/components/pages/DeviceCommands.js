import React from 'react'
import { Container } from 'react-bootstrap'
import SelectCam from '../SelectCam'
import ResizeImage from '../ResizeImage'
import SetSchedule from '../SetSchedule'
import SetTimeInterval from '../SetTimeInterval'
import ChangeResolution from '../ChangeResolution'
import SelectImageType from '../SelectImageType'
import SelectScript from '../SelectScript'
import SetFPS from '../SetFPS'
import TakeImage from '../TakeImage'
import SendData from '../SendData'
import GetStatus from '../GetStatus'

export default function DeviceCommands() {
    return (
        <Container>
            <SelectCam />
            <ResizeImage />
            <SetSchedule/>
            <SetTimeInterval />
            <ChangeResolution />
            <SelectImageType />
            <SelectScript />
            <SetFPS />
            <TakeImage />
            <SendData />
            <GetStatus />
        </Container>
    )
}
