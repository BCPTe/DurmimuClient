import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

const CustPopover = React.forwardRef(
	(props, ref) => {
		// debugger
		return (
			<Popover {...props}
				className="popover_del_component"
				ref={ref}
			>
				<Popover.Body>
					<div className="text-center">
						Do you really want to remove your availability for{" "}
						{props.printDate(props.item.date)}?
					</div>
					<div className="d-flex justify-content-around mt-3">
						<Button
							variant="danger"
							onClick={(e) => {
								props.setIsVisible(false)
								props.handleRemoveDate(e)}
							}
							date-id={props.item.date}
						>
							Yes
						</Button>
						<Button
							variant="secondary"
							onClick={() => props.setIsVisible(false)}
						>
							No
						</Button>
					</div>
				</Popover.Body>
			</Popover>
		);
	}
);

const CustOverlayTrigger = ( {item, printDate, handleRemoveDate} ) => {
	const [isVisible, setIsVisible] = useState(false);
	const _refTarget = React.createRef();

	// useEffect(() => {
	//   console.warn(item)
	// }, [])
	

	// FIXME: fix warnings (red) in console if possible

	return (
		<OverlayTrigger
			rootClose
			trigger="click"
			placement="right"
			show={isVisible}
			overlay={
				<CustPopover
					item={item}
					isVisible={isVisible}
					setIsVisible={setIsVisible}
					printDate={printDate}
					handleRemoveDate={handleRemoveDate}
					ref={_refTarget.current}
				></CustPopover>
			}
		>
			<Button
				variant="danger"
				onClick={() =>
					setIsVisible(true)
				}
			>
				<FontAwesomeIcon icon={faTimes} />
			</Button>
		</OverlayTrigger>
	);
};

export default CustOverlayTrigger;
