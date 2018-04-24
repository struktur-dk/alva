import * as MobX from 'mobx';
import { observer } from 'mobx-react';
import { Project } from '../../store/project';
import { ProjectListComposite } from './project-list-composite';
import * as React from 'react';
import { Store } from '../../store/store';

@observer
export class ProjectListContainer extends React.Component {
	@MobX.observable public focusStates: boolean[] = this.generateInitialFocusList(false);

	@MobX.action
	protected generateInitialFocusList(bool: boolean): boolean[] {
		const projects = this.getProjects();
		const states: boolean[] = [];
		projects.forEach((project: Project) => {
			states.push(bool);
		});
		return states;
	}
	protected getProjects(): Project[] {
		return Store.getInstance().getProjects();
	}

	@MobX.action
	protected handleClick(e: React.MouseEvent<HTMLElement>, i: number): void {
		if (this.focusStates[i]) {
			return;
		}
		this.focusStates.forEach((state, index) => {
			this.focusStates[index] = false;
		});
		this.focusStates[i] = !this.focusStates[i];
	}

	public render(): JSX.Element {
		return (
			<ProjectListComposite
				focusStates={this.focusStates}
				projects={this.getProjects()}
				onClick={this.handleClick}
			/>
		);
	}
}
