import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

const CustPopover = React.forwardRef(({item, printDate, handleRemoveDate, isVisible, setIsVisible, ...props}, ref) => {
	const handleClickInside = (e) => {
		// Prevent the click inside the popover from propagating and closing the popover
		e.stopPropagation();
	};
	  
	return (
		<Popover {...props} className="popover_del_component" ref={ref} onClick={handleClickInside}>
			<Popover.Body>
				<div className="text-center">
					Do you really want to remove your availability for{" "}
					{printDate(item.date)}?
				</div>
				<div className="d-flex justify-content-around mt-3">
					<Button
						variant="danger"
						onClick={(e) => {
							setIsVisible(false);
							handleRemoveDate(e);
						}}
						date-id={item.date}
					>
						Yes
					</Button>
					<Button
						variant="secondary"
						onClick={() => setIsVisible(false)}
					>
						No
					</Button>
				</div>
			</Popover.Body>
		</Popover>
	);
});

const CustOverlayTrigger = ({ item, printDate, handleRemoveDate, ...props}) => {
	const [isVisible, setIsVisible] = useState(false);
	const _refTarget = React.useRef(null);

	// for popover disappearing when click outside of itself
	// CHANGE: IT'S NOT A "REACT WAY"
	const handleOutsideClick = (event) => {
		if (_refTarget.current && !_refTarget.current.contains(event.target)) {
			setIsVisible(false);
		}
	};
	document.addEventListener('click', handleOutsideClick);
	//

	return (
		<OverlayTrigger
			placement="right"
			trigger="click"
			show={isVisible}
			overlay={
				<CustPopover {...props}
					item={item}
					isVisible={isVisible}
					setIsVisible={setIsVisible}
					printDate={printDate}
					handleRemoveDate={handleRemoveDate}
					ref={_refTarget}
				></CustPopover>
			}
		>
			<Button variant="danger" onClick={() => setIsVisible(true)} ref={_refTarget}>
				<FontAwesomeIcon icon={faTimes} />
			</Button>
		</OverlayTrigger>
	);
};

export default CustOverlayTrigger;
