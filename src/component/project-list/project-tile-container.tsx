import { PreviewTile } from '../../lsg/patterns/preview-tile/index';
import Space, { Size } from '../../lsg/patterns/space/index';
import * as MobX from 'mobx';
import { observer } from 'mobx-react';
import { Project } from '../../store/project';
import * as React from 'react';
import { Store } from '../../store/store';

export interface ProjectTileContainerProps {
	focused: boolean;
	onClick: React.MouseEventHandler<HTMLElement>;
	project: Project;
}

@observer
export class ProjectTileContainer extends React.Component<ProjectTileContainerProps> {
	@MobX.observable public editable: boolean = false;
	@MobX.observable public inputValue: string = '';

	public constructor(props: ProjectTileContainerProps) {
		super(props);
		this.inputValue = this.inputValue || this.props.project.getName();
		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.renameProject = this.renameProject.bind(this);
	}

	@MobX.action
	protected handleBlur(): void {
		this.renameProject();
	}

	@MobX.action
	protected handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
		this.inputValue = e.target.value;
	}

	@MobX.action
	protected handleClick(e: React.MouseEvent<HTMLElement>): void {
		this.props.onClick(e);
		if (this.props.focused) {
			this.editable = true;
		}
	}

	protected handleDoubleClick(e: React.MouseEvent<HTMLElement>): void {
		Store.getInstance().openProject(this.props.project.getId());
	}

	@MobX.action
	protected handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
		switch (e.key) {
			case 'Escape':
				this.inputValue = this.props.project.getName();
				this.editable = false;
				break;

			case 'Enter':
				this.renameProject();
				break;

			default:
				return;
		}
	}
	@MobX.action
	protected renameProject(): void {
		if (!this.inputValue) {
			this.inputValue = this.props.project.getName();
			this.editable = false;
			return;
		}

		this.props.project.setName(this.inputValue);
		Store.getInstance().save();
		this.editable = false;
	}

	public render(): JSX.Element {
		return (
			<Space size={Size.S}>
				<PreviewTile
					editable={this.editable}
					focused={this.props.focused}
					id={this.props.project.getId()}
					name={this.inputValue}
					onBlur={this.handleBlur}
					onChange={this.handleChange}
					onClick={this.handleClick}
					onDoubleClick={this.handleDoubleClick}
					onKeyDown={this.handleKeyDown}
					value={this.inputValue}
				/>
			</Space>
		);
	}
}
