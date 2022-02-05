# Exports a project from DaVinci Resolve into the /davinci folder

import DaVinciResolveScript as dvr_script
from inspect import getsourcefile
from os.path import abspath
import os

resolve = dvr_script.scriptapp("Resolve")
fusion = resolve.Fusion()
projectManager = resolve.GetProjectManager()
dirname = os.path.dirname(abspath(getsourcefile(lambda:0)))
# davinciProjectExportPath = os.path.normpath(os.path.join(dirname, '../../../davinci/project.drp'));

videoExportFolder = os.path.normpath(os.path.join(dirname, '../../../../assets'))
projectName = os.environ['PROJECT_NAME']
project = projectManager.LoadProject(projectName)

timeline = project.GetTimelineByIndex(1)
timelineItems = timeline.GetItemListInTrack("video", 1)

# Remove all active render jobs
project.DeleteAllRenderJobs()

project.SetCurrentRenderFormatAndCodec("mov", "ProRes444")
for timelineItem in timelineItems:
	project.SetRenderSettings({
		'MarkIn': timelineItem.GetStart(),
		'MarkOut': timelineItem.GetEnd(),
		'TargetDir': videoExportFolder,
		'CustomName': timelineItem.GetName()
	})
	project.AddRenderJob()

project.StartRendering()
