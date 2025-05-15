import { MonitorState, MonitorTarget } from '@/uptime.types';
import { getColor } from '@/util/color';
import { Box, Tooltip } from '@mantine/core';
import { useResizeObserver } from '@mantine/hooks';
const moment = require('moment');
require('moment-precise-range-plugin');

export default function DetailBar({
    monitor,
    state
}: {
    monitor: MonitorTarget;
    state: MonitorState;
}) {
    const [barRef, barRect] = useResizeObserver();

    const overlapLen = (x1: number, x2: number, y1: number, y2: number) => {
        return Math.max(0, Math.min(x2, y2) - Math.max(x1, y1));
    };

    const uptimePercentBars = [];

    const currentTime = Math.round(Date.now() / 1000);
    const monitorStartTime = state.incident[monitor.id][0].start[0];

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    for (let i = 89; i >= 0; i--) {
        const dayStart = Math.round(todayStart.getTime() / 1000) - i * 86400;
        const dayEnd = dayStart + 86400;

        const _dayMonitorTime = overlapLen(
            dayStart,
            dayEnd,
            monitorStartTime,
            currentTime
        );

        const dayMonitorTime = !_dayMonitorTime ? 0 : 60 * 60 * 24;
        let dayDownTime = 0;

        for (let incident of state.incident[monitor.id]) {
            const incidentStart = incident.start[0];
            const incidentEnd = incident.end ?? currentTime;

            dayDownTime += overlapLen(
                dayStart,
                dayEnd,
                incidentStart,
                incidentEnd
            );
        }

        const dayPercent = (
            ((dayMonitorTime - dayDownTime) / dayMonitorTime) *
            100
        ).toPrecision(4);

        uptimePercentBars.push(
            <Tooltip
                multiline
                key={i}
                events={{ hover: true, focus: false, touch: true }}
                label={
                    Number.isNaN(Number(dayPercent)) ? (
                        'No Data'
                    ) : (
                        <>
                            <div>
                                {dayPercent +
                                    '% at ' +
                                    new Date(
                                        dayStart * 1000
                                    ).toLocaleDateString()}
                            </div>
                            {dayDownTime > 0 ? (
                                <div>{`Down for ${moment.preciseDiff(
                                    moment(0),
                                    moment(dayDownTime * 1000)
                                )}`}</div>
                            ) : (
                                <div>No incidents found</div>
                            )}
                            {/* TODO: latency detail for each bar */}
                        </>
                    )
                }
            >
                <div
                    style={{
                        height: '20px',
                        width: '7px',
                        background: getColor(dayPercent, false),
                        borderRadius: '2px',
                        marginLeft: '1px',
                        marginRight: '1px'
                    }}
                />
            </Tooltip>
        );
    }

    return (
        <>
            <Box
                style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    marginTop: '10px',
                    marginBottom: '5px'
                }}
                visibleFrom="540"
                ref={barRef}
            >
                {uptimePercentBars.slice(
                    Math.floor(Math.max(9 * 90 - barRect.width, 0) / 9),
                    90
                )}
            </Box>
        </>
    );
}
