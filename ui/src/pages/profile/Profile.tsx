/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef } from "react";
import AppLayout from "../../layout/Layout";
import { Avatar, Box, Container, Grid, Stack, TextField } from "@mui/material";
import "./index.scss";
import { Label } from "../../components/common/label/Label";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useImmerState } from "../../hook/useImmerState";
import { DefaultButton } from "../../components/common/button/defaultbutton/DefaultButton";
import ChangePasswordDialog from "../../components/changePassword/ChangePasswordDialog";
interface IProfilePageOwnProps {}


interface IProfilePageState {
  isUpdating: boolean;
	imageFileUrl?: string;
  displayName?: string;
  email?: string;
  isOpenChangePassword?: boolean;
}



const Profile: React.FunctionComponent<IProfilePageOwnProps> = (_props) => {
	const user = useSelector((state: RootState) => state.user.user);
  const initialState: IProfilePageState = {
    imageFileUrl: user?.avatar,
    displayName: user?.displayName,
    email: user?.email,
    isUpdating: false,
    isOpenChangePassword: false,
  };
	const [state, setState] = useImmerState<IProfilePageState>(initialState);
	const avatarPickerRef = useRef<HTMLInputElement | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setState({ imageFileUrl: URL.createObjectURL(file) });
		}
	};

	return (
		<AppLayout>
			<Container className="g-profile-section">
				<Box className="g-profile-update-form" component={"section"}>
					<Stack className="g-profile-title-section">
						<Label className="g-profile-primary-title" title={"Thông tin cá nhân"} />
						<Label className="g-profile-sub-title" title={"Quản lý thông tin cá nhân của bạn"} />
					</Stack>
					<Stack className="g-profile-content">
						<Box className="g-profile-content-form">
							<Stack display={"flex"} alignItems={"center"} justifyContent={"center"}>
								<input type="file" accept="image/*" hidden onChange={handleImageChange} ref={avatarPickerRef} />
								<div style={{cursor: "pointer"}} onClick={() => avatarPickerRef.current?.click()}>
                  <Avatar
                    alt={user?.displayName}
                    src={state.imageFileUrl || user?.avatar}
                    sx={{ width: 80, height: 80 }}
                  />
								</div>
							</Stack>
              <Grid className="g-update-field-container" container rowSpacing={2} columnSpacing={2}>
                <Grid className="g-update-field-label" item xs={4} md={3}>
                  <Label title={"ID của bạn"} />
                </Grid>
                <Grid className="g-update-field-input" item xs={8} md={9}>
                  <TextField
                    id="g-update-field-id"
                    className="g-update-section-input-item"
                    size="small"
                    disabled
                    value={user?._id}
                  />
                </Grid>
                <Grid className="g-update-field-label" item xs={4} md={3}>
                  <Label title={"Tên hiển thị"} />
                </Grid>
                <Grid className="g-update-field-input" item xs={8} md={9}>
                    <TextField
                    id="g-update-field-displayname"
                    className="g-update-section-input-item"
                    name="displayName"
                    size="small"
                    value={state.displayName}
                  />
                </Grid>
                <Grid className="g-update-field-label" item xs={4} md={3}>
                  <Label title={"Email"} />
                </Grid>
                <Grid className="g-update-field-input" item xs={8} md={9}>
                    <TextField
                    id="g-update-field-email"
                    className="g-update-section-input-item"
                    size="small"
                    value={state.email}
                  />
                </Grid>
              </Grid>
              <Stack className="g-update-button-container">
                <DefaultButton 
                  disabled={state.isUpdating}
                  className="g-change-password-button"
                  title="Đổi mật khẩu"
                  onClick={() => setState({isOpenChangePassword: true})}
                />
                {state.isOpenChangePassword && <ChangePasswordDialog 
                  open={state.isOpenChangePassword}
                  onClose={() => setState({isOpenChangePassword: false})}
                />}
                <DefaultButton 
                  disabled={state.isUpdating}
                  isLoading={state.isUpdating}
                  className="g-update-button"
                  title="Cập nhật"
                  iconStyle={{
                    width: 20,
                    height: 20,
                    color: "#fff",
                  }}
                  onClick={() => setState({isUpdating: !state.isUpdating})}
                />
              </Stack>
						</Box>
					</Stack>
				</Box>
			</Container>
		</AppLayout>
	);
};

export default Profile;
