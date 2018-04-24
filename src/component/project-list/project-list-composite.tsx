import Layout from '../../lsg/patterns/layout';
import { observer } from 'mobx-react';
import { Project } from '../../store/project';
import { ProjectTileContainer } from './project-tile-container';
import * as React from 'react';

export interface ProjectListProps {
	focusStates: boolean[];
	projects: Project[];
	onClick(event: React.MouseEvent<HTMLElement>, index: number): void;
}

export const ProjectListComposite: React.StatelessComponent<ProjectListProps> = observer(
	(props): JSX.Element => (
		<Layout>
			{props.projects.map((project: Project, i: number) => (
				<ProjectTileContainer
					focused={props.focusStates[i]}
					key={project.getId()}
					onClick={e => props.onClick(e, i)}
					project={project}
				/>
			))}
		</Layout>
	)
);
