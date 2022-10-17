import style from './IconButton.module.css';

const CLASSNAME = {
	black: {
		normal: style.black,
		filled: style.blackFilled
	},
	red: {
		normal: style.red,
		filled: style.redFilled
	}
};

const IconButton = ({
	kind = 'black',
	filled,
	icon: Icon,
	className,
	...props
}) => {
	const classNames = CLASSNAME[kind];

	const classNameKey = filled ? 'filled' : 'normal';

	const kindClassName = classNames[classNameKey];

	return (
		<button
			{...props}
			className={`${style.button} ${kindClassName} ${className || ''}`}
		>
			<Icon className={style.icon} />
		</button>
	);
};

export default IconButton;
